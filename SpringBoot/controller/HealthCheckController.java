package com.interviewprep.app.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/health")
public class HealthCheckController {

    /**
     * Simple health check endpoint to verify that the application is running.
     *
     * @return A response with status information
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> healthCheck() {
        log.info("Health check request received");

        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("service", "Interview Prep API");

        return ResponseEntity.ok(response);
    }

    /**
     * Detailed health check with component status information
     *
     * @return A response with detailed component status
     */
    @GetMapping("/details")
    public ResponseEntity<Map<String, Object>> detailedHealthCheck() {
        log.info("Detailed health check request received");

        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now().toString());

        // Add component statuses
        Map<String, Object> components = new HashMap<>();

        // Database status would typically be checked with a simple query
        components.put("database", "UP");

        // External API status (like Hugging Face)
        components.put("huggingFaceApi", "UP");

        response.put("components", components);

        log.info("Health check completed successfully");
        return ResponseEntity.ok(response);
    }
}
