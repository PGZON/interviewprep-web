package com.interviewprep.app.controller;

import com.interviewprep.app.dto.QuestionAttemptDTO;
import com.interviewprep.app.service.AttemptService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/attempts")
public class AttemptController {

    private final AttemptService attemptService;

    public AttemptController(AttemptService attemptService) {
        this.attemptService = attemptService;
    }

    /**
     * Submit a batch of question attempts for a user
     *
     * @param attempts List of question attempts
     * @param userId User identifier (provider ID from OAuth)
     * @return Success message
     */
    @PostMapping("/submit")
    public ResponseEntity<String> submitAnswers(@RequestBody List<QuestionAttemptDTO> attempts,
                                                @RequestParam String userId) {
        log.info("Received submission of {} question attempts for user ID: {}", attempts.size(), userId);
        attemptService.saveUserAttempts(userId, attempts);
        return ResponseEntity.ok("Attempts submitted successfully");
    }

    /**
     * Get a user's question attempt history
     *
     * @param userId User identifier (provider ID from OAuth)
     * @return List of question attempt DTOs
     */
    @GetMapping("/history/{userId}")
    public ResponseEntity<List<QuestionAttemptDTO>> getHistory(@PathVariable String userId) {
        log.info("Fetching attempt history for user ID: {}", userId);
        List<QuestionAttemptDTO> history = attemptService.getUserHistory(userId);
        return ResponseEntity.ok(history);
    }

    /**
     * Get a user's question attempts filtered by topic
     *
     * @param userId User identifier (provider ID from OAuth)
     * @param topic Topic to filter by
     * @return List of question attempt DTOs for the specified topic
     */
    @GetMapping("/history/{userId}/topic/{topic}")
    public ResponseEntity<List<QuestionAttemptDTO>> getAttemptsByTopic(
            @PathVariable String userId,
            @PathVariable String topic) {
        log.info("Fetching attempts for user ID: {} and topic: {}", userId, topic);
        List<QuestionAttemptDTO> attempts = attemptService.getAttemptsByTopic(userId, topic);
        return ResponseEntity.ok(attempts);
    }
}
