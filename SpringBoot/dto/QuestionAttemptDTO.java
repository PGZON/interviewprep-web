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
public class QuestionAttemptDTO {
    private Long id;
    private String topic;
    private String difficulty;
    private String question;
    private List<String> options;
    private String correctAnswer;
    private String selectedAnswer;
    private boolean isCorrect;
    private LocalDateTime attemptedAt;
}
