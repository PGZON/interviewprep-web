package com.interviewprep.app.repository;

import com.interviewprep.app.entity.MCQBatch;
import com.interviewprep.app.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByMcqBatch(MCQBatch mcqBatch);
    List<Question> findByMcqBatchId(Long mcqBatchId);
    List<Question> findByTopic(String topic);
    List<Question> findByDifficulty(String difficulty);
}
