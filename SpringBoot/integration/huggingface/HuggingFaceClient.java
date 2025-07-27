package com.interviewprep.app.integration.huggingface;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewprep.app.config.HuggingFaceConfig.HuggingFaceProperties;
import com.interviewprep.app.dto.QuestionDTO;
import com.interviewprep.app.exception.HuggingFaceException;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Component
public class HuggingFaceClient {

    private final RestTemplate restTemplate;
    private final HuggingFaceProperties properties;
    private final HuggingFaceRequestBuilder requestBuilder;
    private final ObjectMapper objectMapper;

    // Regular expressions for parsing the generated MCQ text
    private static final Pattern QUESTION_PATTERN = Pattern.compile("Q\\d+\\.\\s+(.+?)\\s*(?=A\\.)", Pattern.DOTALL);
    private static final Pattern OPTION_PATTERN = Pattern.compile("([A-D])\\.\\s+(.+?)\\s*(?=[A-D]\\.|Answer:|$)", Pattern.DOTALL);
    private static final Pattern ANSWER_PATTERN = Pattern.compile("Answer:\\s*([A-D])");

    public HuggingFaceClient(
            RestTemplate restTemplate,
            HuggingFaceProperties properties,
            HuggingFaceRequestBuilder requestBuilder,
            ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.properties = properties;
        this.requestBuilder = requestBuilder;
        this.objectMapper = objectMapper;
    }

    /**
     * Generates MCQs from Hugging Face API based on topic and difficulty using Chat Completions API
     *
     * @param topic The technical topic for questions
     * @param difficulty The difficulty level
     * @param count Number of questions to generate
     * @return List of parsed Question DTOs
     * @throws HuggingFaceException if the API call fails or response parsing fails
     */
    public List<QuestionDTO> generateMCQs(String topic, String difficulty, int count) {
        log.info("Generating MCQs for topic: {}, difficulty: {}, count: {}", topic, difficulty, count);

        try {
            // Build the chat completion request using the builder
            Map<String, Object> requestBody = requestBuilder.buildChatCompletionRequest(topic, difficulty, count);

            // Ensure we use the model from properties
            requestBody.put("model", properties.getModelId());

            // Create HTTP entity with the request body
            HttpEntity<String> requestEntity = new HttpEntity<>(objectMapper.writeValueAsString(requestBody));

            // Make API call to Chat Completions API
            log.debug("Sending request to Hugging Face Chat Completions API: {}", properties.getApiUrl());

            ResponseEntity<String> response = restTemplate.exchange(
                properties.getApiUrl(), HttpMethod.POST, requestEntity, String.class
            );

            // Parse response
            if (response.getStatusCode() == HttpStatus.OK) {
                log.info("Successfully received response from Hugging Face Chat Completions API");
                return parseChatCompletionResponse(response.getBody(), topic, difficulty);
            } else {
                log.error("API returned non-OK status: {}", response.getStatusCode());
                throw new HuggingFaceException("API returned non-OK status: " + response.getStatusCode());
            }

        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                log.error("API token has been exhausted or is invalid", e);
                throw new HuggingFaceException(HuggingFaceException.TOKEN_EXHAUSTED, e);
            }
            log.error("API client error: {}", e.getMessage(), e);
            throw new HuggingFaceException("API client error: " + e.getMessage(), e);
        } catch (HttpServerErrorException e) {
            if (e.getStatusCode() == HttpStatus.GATEWAY_TIMEOUT) {
                log.error("The model request timed out", e);
                throw new HuggingFaceException(HuggingFaceException.MODEL_TIMEOUT, e);
            }
            log.error("API server error: {}", e.getMessage(), e);
            throw new HuggingFaceException("API server error: " + e.getMessage(), e);
        } catch (JsonProcessingException e) {
            log.error("Error parsing JSON: {}", e.getMessage(), e);
            throw new HuggingFaceException(HuggingFaceException.PARSING_ERROR, e);
        } catch (Exception e) {
            log.error("Unexpected error while calling Hugging Face API: {}", e.getMessage(), e);
            throw new HuggingFaceException("Unexpected error: " + e.getMessage(), e);
        }
    }

    /**
     * Parses the Chat Completions API response into structured QuestionDTOs
     *
     * @param responseJson The JSON response from Chat Completions API
     * @param topic The topic for the questions
     * @param difficulty The difficulty level
     * @return List of parsed Question DTOs
     */
    @SuppressWarnings("unchecked")
    private List<QuestionDTO> parseChatCompletionResponse(String responseJson, String topic, String difficulty) {
        try {
            // Parse the JSON response
            Map<String, Object> responseMap = objectMapper.readValue(responseJson, Map.class);

            // Extract the generated content from the choices
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseMap.get("choices");
            if (choices == null || choices.isEmpty()) {
                throw new HuggingFaceException("No choices found in response");
            }

            Map<String, Object> choice = choices.get(0);
            Map<String, String> message = (Map<String, String>) choice.get("message");
            if (message == null) {
                throw new HuggingFaceException("No message found in response");
            }

            String generatedContent = message.get("content");
            if (generatedContent == null || generatedContent.trim().isEmpty()) {
                throw new HuggingFaceException("Empty content in response");
            }

            log.debug("Successfully extracted content from Chat Completions API response");

            // Parse the generated content into questions
            return parseGeneratedText(generatedContent, topic, difficulty);
        } catch (Exception e) {
            log.error("Error parsing Chat Completions API response: {}", e.getMessage(), e);
            throw new HuggingFaceException(HuggingFaceException.PARSING_ERROR, e);
        }
    }

    /**
     * Parses the generated text into Question DTOs
     *
     * @param generatedText The raw generated text containing MCQs
     * @param topic The topic for the questions
     * @param difficulty The difficulty level
     * @return List of parsed Question DTOs
     */
    private List<QuestionDTO> parseGeneratedText(String generatedText, String topic, String difficulty) {
        List<QuestionDTO> questions = new ArrayList<>();
        String[] questionBlocks = generatedText.split("Q\\d+\\.");

        // Skip first element which is usually empty or contains intro text
        for (int i = 1; i < questionBlocks.length; i++) {
            String block = "Q" + i + "." + questionBlocks[i];
            QuestionDTO question = parseQuestionBlock(block);

            if (question != null) {
                question.setTopic(topic);
                question.setDifficulty(difficulty);
                question.setType("MCQ");
                questions.add(question);
            }
        }

        log.info("Parsed {} questions from generated content", questions.size());
        return questions;
    }

    /**
     * Parses a single question block text into a QuestionDTO
     *
     * @param block The text block containing a single question with options and answer
     * @return Parsed QuestionDTO or null if parsing failed
     */
    private QuestionDTO parseQuestionBlock(String block) {
        try {
            // Extract question text
            Matcher questionMatcher = QUESTION_PATTERN.matcher(block);
            if (!questionMatcher.find()) {
                return null;
            }
            String questionText = questionMatcher.group(1).trim();

            // Extract options
            Matcher optionMatcher = OPTION_PATTERN.matcher(block);
            Map<String, String> options = new HashMap<>();
            List<String> optionTexts = new ArrayList<>();

            while (optionMatcher.find()) {
                String optionLetter = optionMatcher.group(1);
                String optionText = optionMatcher.group(2).trim();
                options.put(optionLetter, optionText);
                optionTexts.add(optionText);
            }

            // Extract correct answer
            Matcher answerMatcher = ANSWER_PATTERN.matcher(block);
            if (!answerMatcher.find()) {
                return null;
            }
            String correctOption = answerMatcher.group(1);

            // Create and return the question DTO
            return QuestionDTO.builder()
                .questionText(questionText)
                .options(optionTexts)
                .correctOption(correctOption)
                .build();

        } catch (Exception e) {
            log.warn("Failed to parse question block: {}", e.getMessage());
            return null; // Skip this question if parsing fails
        }
    }
}
