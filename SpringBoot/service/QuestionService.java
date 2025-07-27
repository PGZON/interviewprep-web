package com.interviewprep.app.service;

import com.interviewprep.app.dto.QuestionDTO;
import com.interviewprep.app.dto.SubmitAnswerRequest;
import com.interviewprep.app.entity.Answer;
import com.interviewprep.app.entity.MCQBatch;
import com.interviewprep.app.entity.Question;
import com.interviewprep.app.entity.TestSession;
import com.interviewprep.app.entity.User;
import com.interviewprep.app.integration.huggingface.HuggingFaceClient;
import com.interviewprep.app.repository.AnswerRepository;
import com.interviewprep.app.repository.MCQBatchRepository;
import com.interviewprep.app.repository.QuestionRepository;
import com.interviewprep.app.repository.TestSessionRepository;
import com.interviewprep.app.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class QuestionService {

    private final HuggingFaceClient huggingFaceClient;
    private final QuestionRepository questionRepository;
    private final MCQBatchRepository mcqBatchRepository;
    private final TestSessionRepository testSessionRepository;
    private final UserRepository userRepository;
    private final AnswerRepository answerRepository;

    public QuestionService(
            HuggingFaceClient huggingFaceClient,
            QuestionRepository questionRepository,
            MCQBatchRepository mcqBatchRepository,
            TestSessionRepository testSessionRepository,
            UserRepository userRepository,
            AnswerRepository answerRepository) {
        this.huggingFaceClient = huggingFaceClient;
        this.questionRepository = questionRepository;
        this.mcqBatchRepository = mcqBatchRepository;
        this.testSessionRepository = testSessionRepository;
        this.userRepository = userRepository;
        this.answerRepository = answerRepository;
    }

    /**
     * Generates questions based on topic and difficulty without saving to DB
     *
     * @param topic The technical topic for questions
     * @param difficulty The difficulty level
     * @return List of generated question DTOs
     */
    public List<QuestionDTO> generateQuestions(String topic, String difficulty) {
        // Standard batch size
        return generateQuestions(topic, difficulty, 10);
    }

    /**
     * Generates questions based on topic, difficulty and custom batch size without saving to DB
     *
     * @param topic The technical topic for questions
     * @param difficulty The difficulty level
     * @param batchSize Number of questions to generate
     * @return List of generated question DTOs
     */
    public List<QuestionDTO> generateQuestions(String topic, String difficulty, int batchSize) {
        // Call Hugging Face client to generate MCQs
        return huggingFaceClient.generateMCQs(topic, difficulty, batchSize);
    }

    /**
     * Generates questions and saves them to the database associated with a user session
     *
     * @param topic The technical topic for questions
     * @param difficulty The difficulty level
     * @param user The user requesting questions
     * @param testSession The current test session (or null to create a new one)
     * @return List of generated question DTOs
     */
    @Transactional
    public List<QuestionDTO> generateAndSaveQuestions(
            String topic, String difficulty, User user, TestSession testSession) {

        log.info("Generating and saving questions for topic: {}, difficulty: {}, user: {}",
                topic, difficulty, user.getEmail());

        // Generate questions via Hugging Face
        List<QuestionDTO> questionDTOs = generateQuestions(topic, difficulty);

        // Create a new test session if none was provided
        if (testSession == null) {
            testSession = new TestSession();
            testSession.setUser(user);
            testSession.setCurrentQuestionIndex(0);
            testSession = testSessionRepository.save(testSession);
            log.info("Created new test session with ID: {}", testSession.getId());
        }

        // Create a new MCQ batch
        MCQBatch mcqBatch = new MCQBatch();
        mcqBatch.setTestSession(testSession);
        mcqBatch = mcqBatchRepository.save(mcqBatch);
        log.info("Created new MCQ batch with ID: {}", mcqBatch.getId());

        // Convert DTOs to entities and save them
        List<Question> questions = new ArrayList<>();

        for (QuestionDTO dto : questionDTOs) {
            Question question = new Question();
            question.setQuestionText(dto.getQuestionText());
            question.setMcqBatch(mcqBatch);
            question.setTopic(dto.getTopic());
            question.setDifficulty(dto.getDifficulty());
            question.setType(dto.getType());
            question.setCorrectOption(dto.getCorrectOption());
            question.setOptions(dto.getOptions());

            questions.add(question);
        }

        // Save all questions
        questionRepository.saveAll(questions);
        log.info("Saved {} questions to database", questions.size());

        // Update DTOs with IDs
        for (int i = 0; i < questions.size(); i++) {
            questionDTOs.get(i).setId(questions.get(i).getId());
        }

        return questionDTOs;
    }

    /**
     * Get a test session for a user, creating a new one if none exists
     *
     * @param userId The ID of the user
     * @return An existing or new TestSession
     */
    @Transactional
    public TestSession getOrCreateTestSession(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }

        User user = userOptional.get();

        // Try to find an existing active session
        Optional<TestSession> existingSession = testSessionRepository
                .findFirstByUserOrderByStartedAtDesc(user);

        // Return existing session if found, otherwise create new one
        if (existingSession.isPresent()) {
            return existingSession.get();
        }

        TestSession newSession = new TestSession();
        newSession.setUser(user);
        newSession.setCurrentQuestionIndex(0);
        return testSessionRepository.save(newSession);
    }

    /**
     * Submit answers for questions in a test session
     *
     * @param userId The ID of the user submitting answers
     * @param submitRequest The request containing answers
     * @return The number of answers processed
     */
    @Transactional
    public int submitAnswers(Long userId, SubmitAnswerRequest submitRequest) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }

        User user = userOptional.get();

        // Find the test session
        Optional<TestSession> sessionOptional = testSessionRepository
                .findById(submitRequest.getSessionId());
        if (sessionOptional.isEmpty()) {
            throw new IllegalArgumentException("Test session not found with ID: " + submitRequest.getSessionId());
        }

        TestSession session = sessionOptional.get();

        // Validate that this session belongs to the user
        if (!session.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Session does not belong to the specified user");
        }

        List<Answer> answers = new ArrayList<>();

        // Process each answer
        for (Map.Entry<Long, String> entry : submitRequest.getAnswers().entrySet()) {
            Long questionId = entry.getKey();
            String selectedOption = entry.getValue();

            Optional<Question> questionOptional = questionRepository.findById(questionId);
            if (questionOptional.isEmpty()) {
                log.warn("Question not found with ID: {}, skipping", questionId);
                continue;
            }

            Question question = questionOptional.get();

            // Create and save the answer
            Answer answer = new Answer();
            answer.setQuestion(question);
            answer.setUser(user);
            answer.setSelectedOption(selectedOption);
            answer.setIsCorrect(selectedOption.equals(question.getCorrectOption()));

            answers.add(answer);
        }

        // Save all answers
        if (!answers.isEmpty()) {
            answerRepository.saveAll(answers);
            log.info("Saved {} answers for user ID: {} in session ID: {}",
                    answers.size(), userId, session.getId());
        }

        return answers.size();
    }

    /**
     * Get all test sessions for a user
     *
     * @param userId The ID of the user
     * @return List of test sessions
     */
    public List<TestSession> getUserSessions(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }

        User user = userOptional.get();
        return testSessionRepository.findByUser(user);
    }

    /**
     * Maps a Question entity to a QuestionDTO
     *
     * @param question The Question entity to map
     * @return The mapped QuestionDTO
     */
    private QuestionDTO mapToDTO(Question question) {
        return QuestionDTO.builder()
                .id(question.getId())
                .questionText(question.getQuestionText())
                .options(question.getOptions())
                .correctOption(question.getCorrectOption())
                .topic(question.getTopic())
                .difficulty(question.getDifficulty())
                .type(question.getType())
                .build();
    }
}
