package com.interviewprep.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProgressDTO {
    private Long totalQuestionsAttempted;
    private Double overallAccuracy;

    // Topic-wise accuracy
    private Map<String, Double> topicAccuracy;

    // Difficulty-wise performance
    private Map<String, Double> difficultyAccuracy;

    // Recent activity (timestamp, topic, accuracy)
    private List<ActivityEntry> recentActivity;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ActivityEntry {
        private String date;
        private String topic;
        private Integer correct;
        private Integer total;
    }
}
