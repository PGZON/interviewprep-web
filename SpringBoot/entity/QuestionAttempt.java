package com.interviewprep.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "question_attempts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String topic;
    private String difficulty;

    @Column(length = 1000)
    private String question;

    @ElementCollection
    @CollectionTable(name = "question_attempt_options", joinColumns = @JoinColumn(name = "attempt_id"))
    @Column(name = "option_text")
    private List<String> options;

    private String correctAnswer;
    private String selectedAnswer;
    private boolean isCorrect;

    private LocalDateTime attemptedAt;
}
