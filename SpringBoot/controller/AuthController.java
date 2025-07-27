package com.interviewprep.app.controller;

import com.interviewprep.app.dto.JwtResponse;
import com.interviewprep.app.dto.LoginRequest;
import com.interviewprep.app.dto.SignupRequest;
import com.interviewprep.app.dto.TokenRefreshRequest;
import com.interviewprep.app.dto.TokenRefreshResponse;
import com.interviewprep.app.entity.User;
import com.interviewprep.app.exception.TokenRefreshException;
import com.interviewprep.app.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            User user = authService.registerUser(signupRequest);
            return ResponseEntity.ok("User registered successfully!");
        } catch (Exception e) {
            log.error("Registration error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
            return ResponseEntity.ok(jwtResponse);
        } catch (Exception e) {
            log.error("Authentication error: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody TokenRefreshRequest request) {
        String refreshToken = request.getRefreshToken();

        try {
            TokenRefreshResponse tokenRefreshResponse = authService.refreshToken(refreshToken);
            return ResponseEntity.ok(tokenRefreshResponse);
        } catch (TokenRefreshException e) {
            log.error("Token refresh error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
