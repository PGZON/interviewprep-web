package com.interviewprep.app.controller;

import com.interviewprep.app.dto.QuestionDTO;
import com.interviewprep.app.dto.QuestionRequest;
import com.interviewprep.app.dto.SubmitAnswerRequest;
import com.interviewprep.app.dto.TestSessionResponse;
import com.interviewprep.app.entity.TestSession;
import com.interviewprep.app.entity.User;
import com.interviewprep.app.repository.UserRepository;
import com.interviewprep.app.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/question")
public class QuestionController {

    private final QuestionService questionService;
    private final UserRepository userRepository;

    public QuestionController(QuestionService questionService, UserRepository userRepository) {
        this.questionService = questionService;
        this.userRepository = userRepository;
    }

    /**
     * Endpoint to generate a batch of MCQs based on topic and difficulty without saving to DB
     *
     * @param request containing topic and difficulty
     * @return List of 10 QuestionDTOs
     */
    @PostMapping("/generate")
    public ResponseEntity<List<QuestionDTO>> generateQuestions(@RequestBody QuestionRequest request) {
        log.info("Generating questions for topic: {}, difficulty: {}",
                request.getTopic(), request.getDifficulty());
        return ResponseEntity.ok(questionService.generateQuestions(
                request.getTopic(), request.getDifficulty()));
    }

    /**
     * Endpoint to generate and save a batch of MCQs for a specific user
     *
     * @param request containing topic and difficulty
     * @param userId ID of the user requesting questions
     * @return List of 10 QuestionDTOs with database IDs
     */
    @PostMapping("/generate-and-save")
    public ResponseEntity<List<QuestionDTO>> generateAndSaveQuestions(
            @RequestBody QuestionRequest request,
            @RequestParam Long userId) {

        log.info("Generating and saving questions for topic: {}, difficulty: {}, userId: {}",
                request.getTopic(), request.getDifficulty(), userId);

        // Find the user
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        User user = userOptional.get();

        // Get or create a session for this user
        TestSession session = questionService.getOrCreateTestSession(userId);

        // Generate and save questions
        List<QuestionDTO> questions = questionService.generateAndSaveQuestions(
                request.getTopic(), request.getDifficulty(), user, session);

        return ResponseEntity.ok(questions);
    }

    /**
     * Submit answers for a batch of questions
     *
     * @param submitRequest containing session ID and answers
     * @param userId ID of the user submitting answers
     * @return Confirmation message with number of answers saved
     */
    @PostMapping("/submit")
    public ResponseEntity<String> submitAnswers(
            @RequestBody SubmitAnswerRequest submitRequest,
            @RequestParam Long userId) {

        log.info("Submitting {} answers for user ID: {}, session ID: {}",
                submitRequest.getAnswers().size(), userId, submitRequest.getSessionId());

        int saved = questionService.submitAnswers(userId, submitRequest);

        return ResponseEntity.ok("Successfully saved " + saved + " answers");
    }

    /**
     * Get all test sessions for a user
     *
     * @param userId ID of the user
     * @return List of test sessions with summary information
     */
    @GetMapping("/sessions/{userId}")
    public ResponseEntity<List<TestSessionResponse>> getUserSessions(@PathVariable Long userId) {
        log.info("Fetching test sessions for user ID: {}", userId);

        List<TestSession> sessions = questionService.getUserSessions(userId);
        List<TestSessionResponse> responses = new ArrayList<>();

        // Convert sessions to response DTOs with summary information
        for (TestSession session : sessions) {
            // Would normally calculate these values from the session data
            // For this example, using placeholder values
            TestSessionResponse response = TestSessionResponse.builder()
                    .id(session.getId())
                    .startedAt(session.getStartedAt())
                    .topic("Multiple") // Would normally aggregate from questions
                    .difficulty("Multiple") // Would normally aggregate from questions
                    .questionCount(10) // Would normally count questions
                    .correctAnswers(7) // Would normally count correct answers
                    .totalAnswers(10) // Would normally count total answers
                    .scorePercentage(70.0) // Would normally calculate
                    .build();

            responses.add(response);
        }

        return ResponseEntity.ok(responses);
    }
}
