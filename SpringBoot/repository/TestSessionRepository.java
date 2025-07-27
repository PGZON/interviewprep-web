package com.interviewprep.app.repository;

import com.interviewprep.app.entity.TestSession;
import com.interviewprep.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestSessionRepository extends JpaRepository<TestSession, Long> {
    List<TestSession> findByUser(User user);
    List<TestSession> findByUserId(Long userId);
    Optional<TestSession> findFirstByUserOrderByStartedAtDesc(User user);
    List<TestSession> findByUserOrderByStartedAtDesc(User user);
}
