package com.interviewprep.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private Long testId;
    private String topic;
    private List<QuestionReviewDTO> questions;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionReviewDTO {
        private String question;
        private List<String> options;
        private String userAnswer;
        private String correctAnswer;
        private Boolean isCorrect;
    }
}
