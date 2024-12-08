package com.project.planpulse.controller;

import com.project.planpulse.model.User;
import com.project.planpulse.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Get user profile
    @GetMapping("/profile")
    public User getUserProfile(Authentication authentication) {
        String userId = authentication.getName(); // Get user ID from JWT token
        return userService.getUserById(userId);
    }

    // Update user profile
    @PutMapping("/profile")
    public User updateUserProfile(Authentication authentication, @RequestBody HashMap<String, Object> updates) {
        String userId = authentication.getName(); // Get user ID from JWT token
        return userService.updateUser(userId, updates);
    }

    // Delete own account
    @DeleteMapping("/profile")
    public Map<String, String> deleteUserProfile(Authentication authentication, HttpServletResponse response) {
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
