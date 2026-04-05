package com.attendance.service;

import com.attendance.dto.LoginRequest;
import com.attendance.dto.RegisterRequest;
import com.attendance.entity.User;
import com.attendance.exception.BadRequestException;
import com.attendance.exception.ResourceNotFoundException;
import com.attendance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    /**
     * Registers a new user (STUDENT or ADMIN).
     */
    public User register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered: " + request.getEmail());
        }

        // Build and save user
        // Note: In production, always hash the password (e.g., BCrypt)
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword()) // plain text for simplicity
                .role(request.getRole())
                .build();

        return userRepository.save(user);
    }

    /**
     * Simple login: checks email + password match.
     */
    public User login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No account found with email: " + request.getEmail()));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new BadRequestException("Incorrect password");
        }

        return user;
    }
}
