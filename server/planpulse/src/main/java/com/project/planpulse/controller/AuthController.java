package com.project.planpulse.controller;

import com.project.planpulse.util.JwtUtil;
import com.project.planpulse.model.User;
import com.project.planpulse.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    // Signup
    @PostMapping(value = "/register", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Map<String, String> register(
            @RequestParam(name = "firstname") String firstname,
            @RequestParam(name = "lastname") String lastname,
            @RequestParam(name = "username") String username,
            @RequestParam(name = "email") String email,
            @RequestParam(name = "password") String password,
            @RequestParam(name = "confirmPassword") String confirmPassword,
            @RequestParam(name = "profileImage", required = false) MultipartFile profileImage,
            HttpServletResponse response) throws IOException {
        User registeredUser = userService.registerUserWithMultipart(firstname, lastname, username, email, password, confirmPassword, profileImage);
        String token = JwtUtil.generateToken(registeredUser.getId());
        addTokenToCookie(response, token);
        return Map.of("token", token, "userId", registeredUser.getId());
    }

    // Login
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> credentials, HttpServletResponse response) {
        String identifier = credentials.get("identifier");
        String password = credentials.get("password");
        User user;
        if (isEmail(identifier)) {
            user = userService.authenticateByEmail(identifier, password);
        } else {
            user = userService.authenticateByUsername(identifier, password);
        }
        if (user == null) {
            throw new RuntimeException("Invalid credentials");
        }
        String token = JwtUtil.generateToken(user.getId());
        addTokenToCookie(response, token);
        return Map.of("token", token);
    }

    // Logout
    @PostMapping("/logout")
    public Map<String, String> logout(HttpServletResponse response) {
        removeTokenCookie(response);
        return Map.of("message", "Logged out successfully");
    }

    // Forgot Password
    @PostMapping("/forgot-password")
    public Map<String, String> forgotPassword(@RequestBody Map<String, String> request) throws RuntimeException {
        String email = request.get("email");
        if (email == null || email.isBlank()) {
            throw new RuntimeException("Email is required");
        }
        userService.initiatePasswordReset(email);
        // a generic message for security reasons
        return Map.of("message", "If an account with that email exists, a reset link has been sent.");
    }

    // Reset Password (after getting the token sent by email)
    @PostMapping("/reset-password")
    public Map<String, String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        String confirmPassword = request.get("confirmPassword");
        if (token == null || token.isBlank() || newPassword == null || newPassword.isBlank() || confirmPassword == null || confirmPassword.isBlank()) {
            throw new RuntimeException("Token, new password, and confirm password are required");
        }
        if (!newPassword.equals(confirmPassword)) {
            throw new RuntimeException("Confirm password and the new password must be the same");
        }
        userService.resetPasswordWithToken(token, newPassword);
        return Map.of("message", "Password has been reset successfully");
    }


    private void addTokenToCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("JWT-TOKEN", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(86400);
        response.addCookie(cookie);
    }

    private void removeTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("JWT-TOKEN", null);
        cookie.setHttpOnly(true);  // cookie should not be accessed via JavaScript
        cookie.setPath("/");       // ensure it applies to the entire application
        cookie.setMaxAge(0);       // cookie to expire immediately
        response.addCookie(cookie);
    }

    private boolean isEmail(String identifier) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return identifier.matches(emailRegex);
    }
}
