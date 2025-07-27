package com.interviewprep.app.service;

import com.interviewprep.app.dto.DashboardDTO;
import com.interviewprep.app.dto.ReviewDTO;
import com.interviewprep.app.entity.Answer;
import com.interviewprep.app.entity.MCQBatch;
import com.interviewprep.app.entity.Question;
import com.interviewprep.app.entity.TestSession;
import com.interviewprep.app.entity.User;
import com.interviewprep.app.repository.AnswerRepository;
import com.interviewprep.app.repository.MCQBatchRepository;
import com.interviewprep.app.repository.QuestionRepository;
import com.interviewprep.app.repository.TestSessionRepository;
import com.interviewprep.app.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class DashboardService {

    private final TestSessionRepository testSessionRepository;
    private final AnswerRepository answerRepository;
    private final MCQBatchRepository mcqBatchRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    /**
     * Get a dashboard summary of all test sessions for a user
     *
     * @param userId The ID of the user
     * @return List of test session summaries
     */
    public List<DashboardDTO> getDashboardSummary(Long userId) {
        log.info("Generating dashboard summary for user ID: {}", userId);

        // Find the user
        User user = findUserById(userId);

        // Get all test sessions for this user
        List<TestSession> sessions = testSessionRepository.findByUserOrderByStartedAtDesc(user);

        List<DashboardDTO> dashboardDTOs = new ArrayList<>();

        // Process each session
        for (TestSession session : sessions) {
            // Get all questions for this session
            List<Question> questions = getAllQuestionsForSession(session);

            if (questions.isEmpty()) {
                continue; // Skip sessions without questions
            }

            // Get all answers for this session's questions
            List<Answer> answers = getAnswersForQuestions(user, questions);

            // Calculate statistics
            int totalQuestions = questions.size();
            int correctAnswers = (int) answers.stream()
                .filter(Answer::getIsCorrect)
                .count();

            // Determine topic and difficulty (using the first question as representative)
            String topic = questions.get(0).getTopic();
            String difficulty = questions.get(0).getDifficulty();

            // Create DTO
            DashboardDTO dto = DashboardDTO.builder()
                .testId(session.getId())
                .topic(topic)
                .difficulty(difficulty)
                .score(correctAnswers)
                .totalQuestions(totalQuestions)
                .date(session.getStartedAt())
                .build();

            dashboardDTOs.add(dto);
        }

        log.info("Found {} test sessions for user ID: {}", dashboardDTOs.size(), userId);
        return dashboardDTOs;
    }

    /**
     * Get detailed review information for a specific test session
     *
     * @param testId The ID of the test session
     * @param userId The ID of the user
     * @return Review data with questions, user answers, and correct answers
     */
    public ReviewDTO getTestReview(Long testId, Long userId) {
        log.info("Generating test review for test ID: {} and user ID: {}", testId, userId);

        // Find the user
        User user = findUserById(userId);

        // Get the test session
        TestSession session = testSessionRepository.findById(testId)
            .orElseThrow(() -> new IllegalArgumentException("Test session not found with ID: " + testId));

        // Verify that the session belongs to the user
        if (!session.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Test session does not belong to the specified user");
        }

        // Get all questions for this session
        List<Question> questions = getAllQuestionsForSession(session);

        if (questions.isEmpty()) {
            log.warn("No questions found for test ID: {}", testId);
            return ReviewDTO.builder()
                .testId(testId)
                .topic("Unknown")
                .questions(new ArrayList<>())
                .build();
        }

        // Get answers for these questions
        List<Answer> answers = getAnswersForQuestions(user, questions);

        // Create a map for quick lookup of answers by question ID
        Map<Long, Answer> answerMap = answers.stream()
            .collect(Collectors.toMap(
                a -> a.getQuestion().getId(),
                a -> a,
                (existing, replacement) -> existing // Keep first answer if duplicates
            ));

        // Create question review DTOs
        List<ReviewDTO.QuestionReviewDTO> questionReviews = new ArrayList<>();

        for (Question question : questions) {
            Answer answer = answerMap.get(question.getId());
            String userAnswer = answer != null ? answer.getSelectedOption() : "Not answered";
            Boolean isCorrect = answer != null ? answer.getIsCorrect() : false;

            ReviewDTO.QuestionReviewDTO reviewDTO = ReviewDTO.QuestionReviewDTO.builder()
                .question(question.getQuestionText())
                .options(question.getOptions())
                .userAnswer(userAnswer)
                .correctAnswer(question.getCorrectOption())
                .isCorrect(isCorrect)
                .build();

            questionReviews.add(reviewDTO);
        }

        // Determine topic (using the first question as representative)
        String topic = questions.get(0).getTopic();

        // Create the full review DTO
        return ReviewDTO.builder()
            .testId(testId)
            .topic(topic)
            .questions(questionReviews)
            .build();
    }

    /**
     * Helper method to find a user by ID
     */
    private User findUserById(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
    }

    /**
     * Helper method to get all questions for a test session
     */
    private List<Question> getAllQuestionsForSession(TestSession session) {
        List<MCQBatch> batches = mcqBatchRepository.findByTestSession(session);
        List<Question> allQuestions = new ArrayList<>();

        for (MCQBatch batch : batches) {
            allQuestions.addAll(questionRepository.findByMcqBatch(batch));
        }

        return allQuestions;
    }

    /**
     * Helper method to get answers for a list of questions
     */
    private List<Answer> getAnswersForQuestions(User user, List<Question> questions) {
        return answerRepository.findByUserAndQuestionIn(user, questions);
    }
}
