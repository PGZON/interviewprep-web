package com.interviewprep.app.controller;

import com.interviewprep.app.dto.ReviewDTO;
import com.interviewprep.app.dto.UserProgressDTO;
import com.interviewprep.app.dto.SessionSummaryDTO;
import com.interviewprep.app.service.AnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
@RequiredArgsConstructor
@Slf4j
public class AnswerController {

    private final AnswerService answerService;

    @GetMapping("/review")
    public ResponseEntity<List<ReviewDTO>> getUserAnswers(@AuthenticationPrincipal UserDetails userDetails) {
        log.info("Fetching answer reviews for user: {}", userDetails.getUsername());
        List<ReviewDTO> reviews = answerService.getUserAnswerReviews(userDetails.getUsername());
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/user-progress")
    public ResponseEntity<UserProgressDTO> getUserProgress(@AuthenticationPrincipal UserDetails userDetails) {
        log.info("Fetching progress stats for user: {}", userDetails.getUsername());
        UserProgressDTO progress = answerService.getUserProgress(userDetails.getUsername());
        return ResponseEntity.ok(progress);
    }

    @GetMapping("/session-summary/{sessionId}")
    public ResponseEntity<SessionSummaryDTO> getSessionSummary(
            @PathVariable Long sessionId,
            @AuthenticationPrincipal UserDetails userDetails) {
        log.info("Fetching session summary for session: {} and user: {}", sessionId, userDetails.getUsername());
        SessionSummaryDTO summary = answerService.getSessionSummary(sessionId, userDetails.getUsername());
        return ResponseEntity.ok(summary);
    }
}
