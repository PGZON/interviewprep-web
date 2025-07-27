package com.interviewprep.app.repository;

import com.interviewprep.app.entity.MCQBatch;
import com.interviewprep.app.entity.TestSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MCQBatchRepository extends JpaRepository<MCQBatch, Long> {
    List<MCQBatch> findByTestSession(TestSession testSession);
    List<MCQBatch> findByTestSessionId(Long testSessionId);
    List<MCQBatch> findByTestSessionOrderByCreatedAtDesc(TestSession testSession);
}
