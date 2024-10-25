package com.project.planpulse.service;

import com.project.planpulse.model.User;

import java.util.Optional;

public interface UserService {
    User registerUser(User user);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    boolean checkPassword(String rawPassword, String encodedPassword);
}
