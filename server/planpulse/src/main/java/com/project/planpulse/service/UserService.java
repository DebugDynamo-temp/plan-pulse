package com.project.planpulse.service;

import com.project.planpulse.model.PasswordResetToken;
import com.project.planpulse.model.User;
import com.project.planpulse.repository.PasswordResetTokenRepository;
import com.project.planpulse.repository.UserRepository;
import com.project.planpulse.validation.PasswordValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private EmailService emailService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(HashMap<String, String> userData) {
        String firstName = userData.get("firstname");
        String lastName = userData.get("lastname");
        String username = userData.get("username");
        String email = userData.get("email");
        String password = userData.get("password");
        String confirmPassword = userData.get("confirmPassword");

        if (firstName == null || firstName.isBlank()) {
            throw new RuntimeException("Firstname is required");
        }
        if (lastName == null || lastName.isBlank()) {
            throw new RuntimeException("Lastname is required");
        }
        if (username == null || username.isBlank()) {
            throw new RuntimeException("Username is required");
        }
        if (email == null || email.isBlank()) {
            throw new RuntimeException("Email is required");
        }
        if (password == null || password.isBlank()) {
            throw new RuntimeException("Password is required");
        }
        if (confirmPassword == null || confirmPassword.isBlank()) {
            throw new RuntimeException("Confirm password is required");
        }
        // Check if password matches confirmPassword
        if (!password.equals(confirmPassword)) {
            throw new RuntimeException("Password and confirmation password do not match");
        }
        // Check for existing username or email
        if (userRepository.existsByUsername(username) || userRepository.existsByEmail(email)) {
            throw new RuntimeException("Username or Email already exists");
        }
        // create and save new User
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }

    public User authenticateByUsername(String username, String password) {
        User user = getUserByUsername(username);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public User authenticateByEmail(String email, String password) {
        User user = getUserByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public User getUserById(String userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User updateUser(String userId, HashMap<String, Object> updates) {
        User existingUser = getUserById(userId);
        // Update fields dynamically from the HashMap
        updates.forEach((key, value) -> {
            switch (key) {
                case "username":
                    String username = (String) value;
                    if (!existingUser.getUsername().equals(username) && userRepository.existsByUsername(username)) {
                        throw new RuntimeException("Username already taken");
                    }
                    existingUser.setUsername(username);
                    break;

                case "email":
                    String email = (String) value;
                    if (!existingUser.getEmail().equals(email) && userRepository.existsByEmail(email)) {
                        throw new RuntimeException("Email already in use");
                    }
                    existingUser.setEmail(email);
                    break;

                case "firstname":
                    existingUser.setFirstName((String) value);
                    break;

                case "lastname":
                    existingUser.setLastName((String) value);
                    break;

                default:
                    throw new RuntimeException("Invalid field: " + key);
            }
        });
        return userRepository.save(existingUser);
    }

    public void deleteUser(String userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            userRepository.deleteById(userId);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    // Forgot Password
    public void initiatePasswordReset(String email) throws IOException {
        User user = getUserByEmail(email);
        if (user == null) {
            // not revealing that the email does not exist
            return;
        }
        // Create a new password reset token (valid for 15 minutes)
        PasswordResetToken resetToken = new PasswordResetToken(user.getId(), 15);
        passwordResetTokenRepository.save(resetToken);
        // Send email to user with reset link
        emailService.sendPasswordResetEmail(user.getEmail(), resetToken.getToken());
    }

    public void resetPasswordWithToken(String token, String newPassword) {
        if (!isValidPassword(newPassword)) {
            throw new RuntimeException("Password does not meet requirements");
        }
        Optional<PasswordResetToken> optionalToken = passwordResetTokenRepository.findByToken(token);
        if (optionalToken.isEmpty()) {
            throw new RuntimeException("Invalid token");
        }
        PasswordResetToken resetToken = optionalToken.get();
        if (resetToken.isExpired()) {
            passwordResetTokenRepository.delete(resetToken); // Clean up expired token
            throw new RuntimeException("Token has expired");
        }
        User user = getUserById(resetToken.getUserId());
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        // Delete the token after successful password reset
        passwordResetTokenRepository.delete(resetToken);
    }

    // Password reset for authenticated user
    public void resetPassword(String userId, String currentPassword, String newPassword, String confirmPassword) {
        if (!isValidPassword(newPassword)) {
            throw new RuntimeException("Password does not meet requirements");
        }
        User user = getUserById(userId);
        // Validate the current password
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        // validate the new password and confirmation match
        if (newPassword == null || newPassword.isBlank()) {
            throw new RuntimeException("New password cannot be empty");
        }
        if (!newPassword.equals(confirmPassword)) {
            throw new RuntimeException("New password and confirmation do not match");
        }

        String hashedPassword = passwordEncoder.encode(newPassword);
        // update and save the user with the new hashed password
        user.setPassword(hashedPassword);
        userRepository.save(user);
    }

    private boolean isValidPassword(String password) {
        PasswordValidator validator = new PasswordValidator();
        return validator.isValid(password, null);
    }

}
