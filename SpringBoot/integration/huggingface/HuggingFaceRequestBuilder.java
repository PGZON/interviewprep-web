package com.interviewprep.app.integration.huggingface;

import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class HuggingFaceRequestBuilder {

    /**
     * Builds a chat completion request for generating MCQs based on topic and difficulty
     * Compatible with the Chat Completions API format
     *
     * @param topic The technical topic for questions (e.g., "Java OOP", "SQL", "Operating Systems")
     * @param difficulty The difficulty level ("easy", "medium", or "hard")
     * @param count Number of questions to generate
     * @return A map representing the chat completions request body
     */
    public Map<String, Object> buildChatCompletionRequest(String topic, String difficulty, int count) {
        Map<String, Object> requestBody = new HashMap<>();

        // Set the model ID
        requestBody.put("model", "google/flan-t5-base");

        // Create messages array with system and user messages
        List<Map<String, String>> messages = new ArrayList<>();

        // Add system message (instructions for the model)
        Map<String, String> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", "You are a technical quiz generator specialized in creating multiple-choice questions on technical topics. " +
                          "Create clear and precise questions that test understanding, not just memorization.");
        messages.add(systemMessage);

        // Add user message (specific request)
        Map<String, String> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", buildMCQPrompt(topic, difficulty, count));
        messages.add(userMessage);

        requestBody.put("messages", messages);

        // Add parameters for generation
        requestBody.put("temperature", 0.7);
        requestBody.put("max_tokens", 2048);
        requestBody.put("top_p", 0.9);

        return requestBody;
    }

    /**
     * Builds an optimized prompt for generating MCQs based on topic and difficulty
     * Format is designed to be token-efficient while providing clear structure for the model
     *
     * @param topic The technical topic for questions
     * @param difficulty The difficulty level
     * @param count Number of questions to generate
     * @return A formatted prompt string
     */
    public String buildMCQPrompt(String topic, String difficulty, int count) {
        return String.format(
            "Generate %d multiple choice questions on %s with %s difficulty level. Format:\n" +
            "Q1. Question?\n" +
            "A. Option1\n" +
            "B. Option2\n" +
            "C. Option3\n" +
            "D. Option4\n" +
            "Answer: [Correct Option]\n\n" +
            "Questions should be technical, precise, and test understanding, not just memorization. " +
            "Each question must have exactly one correct answer. " +
            "Do not provide explanations. Only output in the format specified above.",
            count, topic, difficulty
        );
    }
}
