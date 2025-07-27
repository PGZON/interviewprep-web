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
public class TestSessionResponse {
    private Long id;
    private LocalDateTime startedAt;
    private String topic;
    private String difficulty;
    private Integer questionCount;
    private Integer correctAnswers;
    private Integer totalAnswers;
    private Double scorePercentage;
}
