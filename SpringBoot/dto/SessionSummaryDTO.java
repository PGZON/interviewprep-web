package com.interviewprep.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionSummaryDTO {
    private Long sessionId;
    private String topic;
    private String difficulty;
    private LocalDateTime startedAt;
    private Integer correctAnswers;
    private Integer totalQuestions;
    private Double accuracyPercentage;

    private List<QuestionSummary> questions;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionSummary {
        private Long questionId;
        private String questionText;
        private String userAnswer;
        private String correctAnswer;
        private boolean isCorrect;
    }
}
