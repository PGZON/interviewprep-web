package com.interviewprep.app.service;

import com.interviewprep.app.dto.JwtResponse;
import com.interviewprep.app.dto.LoginRequest;
import com.interviewprep.app.dto.SignupRequest;
import com.interviewprep.app.dto.TokenRefreshResponse;
import com.interviewprep.app.entity.RefreshToken;
import com.interviewprep.app.entity.User;
import com.interviewprep.app.exception.TokenRefreshException;
import com.interviewprep.app.repository.UserRepository;
import com.interviewprep.app.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;

    /**
     * Register a new user with email and password
     *
     * @param request SignupRequest containing name, email, and password
     * @return The newly created user
     * @throws RuntimeException if email already exists
     */
    public User registerUser(SignupRequest request) {
        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");
        user.setProvider("local"); // to distinguish from OAuth2 users

        log.info("Registering new user with email: {}", request.getEmail());
        return userRepository.save(user);
    }

    /**
     * Authenticate a user and generate JWT token with refresh token
     *
     * @param loginRequest LoginRequest containing email and password
     * @return JwtResponse containing the JWT, refresh token, and user details
     */
    @Transactional
    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateToken(loginRequest.getEmail());

        // Get our application User from repository
        User user = userRepository.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found with email: " + loginRequest.getEmail()));

        // Generate refresh token
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

        log.info("User authenticated successfully: {}", loginRequest.getEmail());

        return JwtResponse.builder()
            .token(jwt)
            .refreshToken(refreshToken.getToken())
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .role(user.getRole())
            .build();
    }

    /**
     * Refresh an access token using a valid refresh token
     *
     * @param refreshToken The refresh token
     * @return TokenRefreshResponse containing new access token and refresh token
     */
    public TokenRefreshResponse refreshToken(String refreshToken) {
        return refreshTokenService.findByToken(refreshToken)
            .map(refreshTokenService::verifyExpiration)
            .map(RefreshToken::getUser)
            .map(user -> {
                String newAccessToken = jwtUtil.generateToken(user.getEmail());
                return TokenRefreshResponse.builder()
                    .accessToken(newAccessToken)
                    .refreshToken(refreshToken)
                    .build();
            })
            .orElseThrow(() -> new TokenRefreshException(refreshToken, "Refresh token not found"));
    }
}
