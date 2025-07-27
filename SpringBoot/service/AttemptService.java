package com.interviewprep.app.service;

import com.interviewprep.app.dto.QuestionAttemptDTO;

import java.util.List;

public interface AttemptService {
    /**
     * Save a list of question attempts for a specific user
     *
     * @param userId User identifier (could be providerId or actual id)
     * @param attempts List of attempt DTOs to be saved
     */
    void saveUserAttempts(String userId, List<QuestionAttemptDTO> attempts);

    /**
     * Retrieve question attempt history for a specific user
     *
     * @param userId User identifier (could be providerId or actual id)
     * @return List of question attempt DTOs
     */
    List<QuestionAttemptDTO> getUserHistory(String userId);

    /**
     * Get user's performance analytics by topic
     *
     * @param userId User identifier
     * @return Map of topics to success rates
     */
    List<QuestionAttemptDTO> getAttemptsByTopic(String userId, String topic);
}
