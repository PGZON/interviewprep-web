package com.interviewprep.app.service;

import com.interviewprep.app.dto.QuestionAttemptDTO;
import com.interviewprep.app.entity.QuestionAttempt;
import com.interviewprep.app.entity.User;
import com.interviewprep.app.repository.QuestionAttemptRepository;
import com.interviewprep.app.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class AttemptServiceImpl implements AttemptService {

    private final QuestionAttemptRepository attemptRepository;
    private final UserRepository userRepository;

    public AttemptServiceImpl(QuestionAttemptRepository attemptRepository, UserRepository userRepository) {
        this.attemptRepository = attemptRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void saveUserAttempts(String userId, List<QuestionAttemptDTO> attempts) {
        log.info("Saving {} question attempts for user ID: {}", attempts.size(), userId);

        // Using findById since providerId alone is insufficient
        // If userId is the database ID:
        Optional<User> userOptional = userRepository.findById(Long.parseLong(userId));

        // Alternatively, if you need to look up by providerId and know the provider:
        // Optional<User> userOptional = userRepository.findByProviderAndProviderId("oauth-provider-name", userId);

        // Or if userId is actually an email:
        // Optional<User> userOptional = userRepository.findByEmail(userId);

        if (userOptional.isEmpty()) {
            log.error("User not found with ID: {}", userId);
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }

        User user = userOptional.get();
        List<QuestionAttempt> questionAttempts = new ArrayList<>();

        // Convert DTOs to entities and set common attributes
        for (QuestionAttemptDTO dto : attempts) {
            QuestionAttempt attempt = new QuestionAttempt();
            attempt.setUser(user);
            attempt.setTopic(dto.getTopic());
            attempt.setDifficulty(dto.getDifficulty());
            attempt.setQuestion(dto.getQuestion());
            attempt.setOptions(dto.getOptions());
            attempt.setCorrectAnswer(dto.getCorrectAnswer());
            attempt.setSelectedAnswer(dto.getSelectedAnswer());

            // Calculate if the answer is correct
            attempt.setCorrect(dto.getCorrectAnswer().equals(dto.getSelectedAnswer()));

            // Set timestamp if not provided
            attempt.setAttemptedAt(dto.getAttemptedAt() != null ?
                    dto.getAttemptedAt() : LocalDateTime.now());

            questionAttempts.add(attempt);
        }

        // Save all attempts in a batch
        attemptRepository.saveAll(questionAttempts);
        log.info("Successfully saved {} attempts for user {}", questionAttempts.size(), userId);
    }

    @Override
    public List<QuestionAttemptDTO> getUserHistory(String userId) {
        log.info("Fetching question attempt history for user ID: {}", userId);

        // Using findById since providerId alone is insufficient
        Optional<User> userOptional = userRepository.findById(Long.parseLong(userId));

        if (userOptional.isEmpty()) {
            log.error("User not found with ID: {}", userId);
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }

        User user = userOptional.get();

        // Get all attempts for this user
        List<QuestionAttempt> attempts = attemptRepository.findByUserId(user.getId());

        // Convert entities to DTOs
        return attempts.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<QuestionAttemptDTO> getAttemptsByTopic(String userId, String topic) {
        log.info("Fetching question attempts for user ID: {} and topic: {}", userId, topic);

        // Using findById since providerId alone is insufficient
        Optional<User> userOptional = userRepository.findById(Long.parseLong(userId));

        if (userOptional.isEmpty()) {
            log.error("User not found with ID: {}", userId);
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }

        User user = userOptional.get();

        // Query by user ID and topic
        List<QuestionAttempt> attempts = attemptRepository.findByUserId(user.getId())
                .stream()
                .filter(attempt -> attempt.getTopic().equals(topic))
                .collect(Collectors.toList());

        // Convert entities to DTOs
        return attempts.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Maps a QuestionAttempt entity to a QuestionAttemptDTO
     *
     * @param attempt The entity to map
     * @return The mapped DTO
     */
    private QuestionAttemptDTO mapToDTO(QuestionAttempt attempt) {
        return QuestionAttemptDTO.builder()
                .id(attempt.getId())
                .topic(attempt.getTopic())
                .difficulty(attempt.getDifficulty())
                .question(attempt.getQuestion())
                .options(attempt.getOptions())
                .correctAnswer(attempt.getCorrectAnswer())
                .selectedAnswer(attempt.getSelectedAnswer())
                .isCorrect(attempt.isCorrect())
                .attemptedAt(attempt.getAttemptedAt())
                .build();
    }
}
