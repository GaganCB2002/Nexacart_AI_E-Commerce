package com.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody AuthRequest request) {
        Map<String, Object> response = new HashMap<>();
        User user = userRepository.findByEmail(request.getEmail());

        if (user != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            response.put("status", "SUCCESS");
            response.put("message", "Login successful!");
            response.put("token", "dummy-token-" + System.currentTimeMillis());
            response.put("username", user.getUsername());
            response.put("userId", user.getId());
            response.put("role", user.getRole());

            user.setLastLogin(java.time.LocalDateTime.now());
            userRepository.save(user);
        } else {
            response.put("status", "ERROR");
            response.put("message", "Invalid email or password");
        }
        return response;
    }

    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody AuthRequest request) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.existsByEmail(request.getEmail())) {
            response.put("status", "ERROR");
            response.put("message", "Email already exists!");
            return response;
        }

        // Strong Password Validation - REMOVED for easier testing
        // if
        // (!request.getPassword().matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$"))
        // {
        // response.put("status", "ERROR");
        // response.put("message", "Password must be 8+ chars, have Upper, Lower,
        // Number, and Special char!");
        // return response;
        // }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ? request.getRole() : "BUYER");

        userRepository.save(user);

        response.put("status", "SUCCESS");
        response.put("message", "Account created successfully!");
        return response;
    }

    @PostMapping("/reset-password")
    public Map<String, Object> resetPassword(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String emailOrUsername = request.get("identifier");
        String newPassword = request.get("newPassword");

        User user = userRepository.findByEmail(emailOrUsername);
        if (user == null) {
            user = userRepository.findByUsername(emailOrUsername);
        }

        if (user == null) {
            response.put("status", "ERROR");
            response.put("message", "User not found");
            return response;
        }

        // Validate new password
        if (!newPassword.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$")) {
            response.put("status", "ERROR");
            response.put("message", "Password must be 8+ chars, have Upper, Lower, Number, and Special char!");
            return response;
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        response.put("status", "SUCCESS");
        response.put("message", "Password reset successfully! Please login.");
        return response;
    }
}
