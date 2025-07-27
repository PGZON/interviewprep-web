package com.interviewprep.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {
    private Long testId;
    private String topic;
    private String difficulty;
    private Integer score;
    private Integer totalQuestions;
    private LocalDateTime date;
}
