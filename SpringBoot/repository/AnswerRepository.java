package com.interviewprep.app.repository;

import com.interviewprep.app.entity.Answer;
import com.interviewprep.app.entity.Question;
import com.interviewprep.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByUser(User user);
    List<Answer> findByUserId(Long userId);
    List<Answer> findByQuestion(Question question);
    List<Answer> findByQuestionId(Long questionId);
    Optional<Answer> findByUserAndQuestion(User user, Question question);
    List<Answer> findByUserAndIsCorrect(User user, Boolean isCorrect);
    List<Answer> findByUserAndQuestionIn(User user, List<Question> questions);
    Optional<Answer> findByQuestionIdAndUserId(Long questionId, Long userId);
}
