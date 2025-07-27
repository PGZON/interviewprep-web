package com.interviewprep.app.service;

import com.interviewprep.app.dto.ReviewDTO;
import com.interviewprep.app.dto.SessionSummaryDTO;
import com.interviewprep.app.dto.UserProgressDTO;
import com.interviewprep.app.entity.Answer;
import com.interviewprep.app.entity.MCQBatch;
import com.interviewprep.app.entity.Question;
import com.interviewprep.app.entity.TestSession;
import com.interviewprep.app.entity.User;
import com.interviewprep.app.exception.ResourceNotFoundException;
import com.interviewprep.app.repository.AnswerRepository;
import com.interviewprep.app.repository.TestSessionRepository;
import com.interviewprep.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;
    private final TestSessionRepository testSessionRepository;

    /**
     * Get all answers for review by a specific user
     */
    public List<ReviewDTO> getUserAnswerReviews(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        List<TestSession> userSessions = testSessionRepository.findByUserIdOrderByStartedAtDesc(user.getId());
        List<ReviewDTO> reviews = new ArrayList<>();

        // For each test session, create a review
        for (TestSession session : userSessions) {
            ReviewDTO review = ReviewDTO.builder()
                .testId(session.getId())
                .date(session.getStartedAt())
                .build();

            // Get topic and difficulty from the first batch (assuming consistent within a session)
            if (!session.getMcqBatches().isEmpty()) {
                MCQBatch firstBatch = session.getMcqBatches().get(0);
                if (!firstBatch.getQuestions().isEmpty()) {
                    Question firstQuestion = firstBatch.getQuestions().get(0);
                    review.setTopic(firstQuestion.getTopic());
                    review.setDifficulty(firstQuestion.getDifficulty());
                }
            }

            // Get all questions and user answers for this session
            List<ReviewDTO.QuestionReviewDTO> questionReviews = new ArrayList<>();

            for (MCQBatch batch : session.getMcqBatches()) {
                for (Question question : batch.getQuestions()) {
                    // Find user's answer to this question
                    Answer answer = answerRepository.findByQuestionIdAndUserId(question.getId(), user.getId())
                        .orElse(null);

                    ReviewDTO.QuestionReviewDTO questionReview = ReviewDTO.QuestionReviewDTO.builder()
                        .question(question.getQuestionText())
                        .options(question.getOptions())
                        .userAnswer(answer != null ? answer.getSelectedOption() : null)
                        .correctAnswer(question.getCorrectOption())
                        .isCorrect(answer != null && answer.isCorrect())
                        .build();

                    questionReviews.add(questionReview);
                }
            }

            review.setQuestions(questionReviews);
            // Calculate score
            long correct = questionReviews.stream().filter(ReviewDTO.QuestionReviewDTO::isCorrect).count();
            review.setScore((int) correct);
            review.setTotalQuestions(questionReviews.size());

            reviews.add(review);
        }

        return reviews;
    }

    /**
     * Get user progress statistics
     */
    public UserProgressDTO getUserProgress(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        // Get all answers by this user
        List<Answer> answers = answerRepository.findByUserId(user.getId());

        if (answers.isEmpty()) {
            return UserProgressDTO.builder()
                .totalQuestionsAttempted(0L)
                .overallAccuracy(0.0)
                .topicAccuracy(new HashMap<>())
                .difficultyAccuracy(new HashMap<>())
                .recentActivity(new ArrayList<>())
                .build();
        }

        // Calculate total questions and overall accuracy
        long totalQuestions = answers.size();
        long correctAnswers = answers.stream().filter(Answer::isCorrect).count();
        double overallAccuracy = totalQuestions > 0 ? (double) correctAnswers / totalQuestions * 100 : 0;

        // Group by topic
        Map<String, List<Answer>> byTopic = answers.stream()
            .collect(Collectors.groupingBy(a -> a.getQuestion().getTopic()));

        Map<String, Double> topicAccuracy = new HashMap<>();
        byTopic.forEach((topic, topicAnswers) -> {
            long topicCorrect = topicAnswers.stream().filter(Answer::isCorrect).count();
            double accuracy = (double) topicCorrect / topicAnswers.size() * 100;
            topicAccuracy.put(topic, accuracy);
        });

        // Group by difficulty
        Map<String, List<Answer>> byDifficulty = answers.stream()
            .collect(Collectors.groupingBy(a -> a.getQuestion().getDifficulty()));

        Map<String, Double> difficultyAccuracy = new HashMap<>();
        byDifficulty.forEach((difficulty, diffAnswers) -> {
            long diffCorrect = diffAnswers.stream().filter(Answer::isCorrect).count();
            double accuracy = (double) diffCorrect / diffAnswers.size() * 100;
            difficultyAccuracy.put(difficulty, accuracy);
        });

        // Recent activity (last 5 sessions)
        List<UserProgressDTO.ActivityEntry> recentActivity = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Group answers by date and topic
        Map<String, Map<String, List<Answer>>> byDateAndTopic = answers.stream()
            .collect(Collectors.groupingBy(
                a -> a.getAnsweredAt().format(formatter),
                Collectors.groupingBy(a -> a.getQuestion().getTopic())
            ));

        byDateAndTopic.entrySet().stream()
            .sorted((e1, e2) -> e2.getKey().compareTo(e1.getKey())) // Latest first
            .limit(5)
            .forEach(dateEntry -> {
                dateEntry.getValue().forEach((topic, topicAnswers) -> {
                    long correct = topicAnswers.stream().filter(Answer::isCorrect).count();
                    recentActivity.add(
                        UserProgressDTO.ActivityEntry.builder()
                            .date(dateEntry.getKey())
                            .topic(topic)
                            .correct((int) correct)
                            .total(topicAnswers.size())
                            .build()
                    );
                });
            });

        return UserProgressDTO.builder()
            .totalQuestionsAttempted(totalQuestions)
            .overallAccuracy(overallAccuracy)
            .topicAccuracy(topicAccuracy)
            .difficultyAccuracy(difficultyAccuracy)
            .recentActivity(recentActivity)
            .build();
    }

    /**
     * Get summary for a specific test session
     */
    public SessionSummaryDTO getSessionSummary(Long sessionId, String email) {
        // Get user by email
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        // Get session by id
        TestSession session = testSessionRepository.findById(sessionId)
            .orElseThrow(() -> new ResourceNotFoundException("Session not found with id: " + sessionId));

        // Ensure this session belongs to the requesting user
        if (!session.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You are not authorized to view this session");
        }

        // Get the topic and difficulty from the first question (assuming consistency)
        String topic = "";
        String difficulty = "";

        if (!session.getMcqBatches().isEmpty() &&
            !session.getMcqBatches().get(0).getQuestions().isEmpty()) {
            Question firstQuestion = session.getMcqBatches().get(0).getQuestions().get(0);
            topic = firstQuestion.getTopic();
            difficulty = firstQuestion.getDifficulty();
        }

        // Gather all questions from this session
        List<SessionSummaryDTO.QuestionSummary> questionSummaries = new ArrayList<>();
        int correctCount = 0;
        int totalCount = 0;

        for (MCQBatch batch : session.getMcqBatches()) {
            for (Question question : batch.getQuestions()) {
                Answer answer = answerRepository.findByQuestionIdAndUserId(question.getId(), user.getId())
                    .orElse(null);

                boolean isCorrect = answer != null && answer.isCorrect();
                if (isCorrect) correctCount++;
                if (answer != null) totalCount++;

                questionSummaries.add(
                    SessionSummaryDTO.QuestionSummary.builder()
                        .questionId(question.getId())
                        .questionText(question.getQuestionText())
                        .userAnswer(answer != null ? answer.getSelectedOption() : null)
                        .correctAnswer(question.getCorrectOption())
                        .isCorrect(isCorrect)
                        .build()
                );
            }
        }

        double accuracyPercentage = totalCount > 0 ? (double) correctCount / totalCount * 100 : 0;

        return SessionSummaryDTO.builder()
            .sessionId(sessionId)
            .topic(topic)
            .difficulty(difficulty)
            .startedAt(session.getStartedAt())
            .correctAnswers(correctCount)
            .totalQuestions(totalCount)
            .accuracyPercentage(accuracyPercentage)
            .questions(questionSummaries)
            .build();
    }
}
