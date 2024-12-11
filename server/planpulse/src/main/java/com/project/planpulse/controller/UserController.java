package com.project.planpulse.controller;

import com.project.planpulse.model.User;
import com.project.planpulse.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile-image")
    public ResponseEntity<Resource> serveProfileImage(Authentication authentication) {
        String userId = authentication.getName();
        return userService.loadProfileImage(userId);
    }

    // Get user profile
    @GetMapping("/profile")
    public User getUserProfile(Authentication authentication) {
        String userId = authentication.getName(); // user ID from JWT token
        return userService.getUserById(userId);
    }

    // Update user profile
    @PutMapping(value = "/profile", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public User updateUserProfile(
            Authentication authentication,
            @RequestParam(name = "firstname", required = false) String firstname,
            @RequestParam(name = "lastname", required = false) String lastname,
            @RequestParam(name = "username", required = false) String username,
            @RequestParam(name = "email", required = false) String email,
            @RequestParam(name = "profileImage", required = false) MultipartFile profileImage
    ) throws IOException {
        String userId = authentication.getName();
        return userService.updateUserWithMultipart(userId, username, email, firstname, lastname, profileImage);
    }

    @PutMapping(value = "/reset-password")
    public Map<String, String> resetPassword(@RequestBody Map<String, String> request, Authentication authentication) throws RuntimeException {
        String requesterId = authentication.getName();
        String email = request.get("email");
        String currentPassword = request.get("password");
        String newPassword = request.get("newPassword");
        String confirmPassword = request.get("confirmPassword");
        if (email == null || email.isBlank()) {
            throw new RuntimeException("Email is required");
        }
        User user = userService.getUserByEmail(email, requesterId);
        userService.resetPassword(user, currentPassword, newPassword, confirmPassword);
        return Map.of("message", "Password changed successfully.");
    }

    // Delete own account
    @DeleteMapping("/profile")
    public Map<String, String> deleteUser(Authentication authentication, HttpServletResponse response) {
        String userId = authentication.getName();
        userService.deleteUser(userId);
        // Remove JWT cookie as user is deleted
        removeTokenCookie(response);
        return Map.of("message", "User account deleted successfully");
    }

    private void removeTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("JWT-TOKEN", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }
}
