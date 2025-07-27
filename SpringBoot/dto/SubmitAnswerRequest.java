package com.interviewprep.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitAnswerRequest {
    private Long sessionId;
    // Map of questionId -> selectedOption
    private Map<Long, String> answers;
}
