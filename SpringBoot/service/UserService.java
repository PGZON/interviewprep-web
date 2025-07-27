package com.interviewprep.app.service;

import com.interviewprep.app.dto.UserDTO;
import com.interviewprep.app.entity.User;
import com.interviewprep.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    /**
     * Get user by email and convert to UserDTO
     *
     * @param email User's email address
     * @return UserDTO object containing user information
     */
    public UserDTO getUserByEmail(String email) {
        log.info("Getting user by email: {}", email);

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return mapToDTO(user);
    }

    /**
     * Maps User entity to UserDTO
     */
    private UserDTO mapToDTO(User user) {
        return UserDTO.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .provider(user.getProvider())
            .providerId(user.getProviderId())
            .build();
    }
}
