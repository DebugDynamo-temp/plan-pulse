package com.project.planpulse.controller;

import com.project.planpulse.auth.JwtUtil;
import com.project.planpulse.model.User;
import com.project.planpulse.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Map<String, String> register(@Valid @RequestBody User user, HttpServletResponse response) {
        if (userService.getUserByUsername(user.getUsername()) != null || userService.getUserByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Username or email already exists");
        }
        User registeredUser = userService.registerUser(user);
        String token = JwtUtil.generateToken(registeredUser.getId());
        addTokenToCookie(response, token);
        return Map.of("token", token);
    }

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


    private void addTokenToCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("JWT-TOKEN", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(86400);
        response.addCookie(cookie);
    }

    private boolean isEmail(String identifier) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return identifier.matches(emailRegex);
    }
}
