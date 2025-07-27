package com.interviewprep.app.controller;

import com.interviewprep.app.dto.DashboardDTO;
import com.interviewprep.app.dto.ReviewDTO;
import com.interviewprep.app.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Slf4j
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * Get test session summaries for a user
     *
     * @param userId The ID of the user
     * @return List of test session summaries
     */
    @GetMapping("/summary")
    public ResponseEntity<List<DashboardDTO>> getDashboardSummary(@RequestParam Long userId) {
        log.info("Fetching dashboard summary for user ID: {}", userId);
        List<DashboardDTO> dashboardData = dashboardService.getDashboardSummary(userId);
        return ResponseEntity.ok(dashboardData);
    }

    /**
     * Get a detailed review for a specific test session
     *
     * @param testId The ID of the test session
     * @param userId The ID of the user
     * @return Detailed review of the test session
     */
    @GetMapping("/review/{testId}")
    public ResponseEntity<ReviewDTO> getTestReview(
            @PathVariable Long testId,
            @RequestParam Long userId) {
        log.info("Fetching test review for test ID: {} and user ID: {}", testId, userId);
        ReviewDTO reviewData = dashboardService.getTestReview(testId, userId);
        return ResponseEntity.ok(reviewData);
    }
}
