package com.interviewprep.app.repository;

import com.interviewprep.app.entity.QuestionAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionAttemptRepository extends JpaRepository<QuestionAttempt, Long> {
    List<QuestionAttempt> findByUserId(Long userId);
    List<QuestionAttempt> findByUserProviderId(String providerId);
    List<QuestionAttempt> findByTopic(String topic);
    List<QuestionAttempt> findByTopicAndDifficulty(String topic, String difficulty);
}
