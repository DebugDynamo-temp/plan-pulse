package com.project.planpulse.service;

import com.project.planpulse.model.PasswordResetToken;
import com.project.planpulse.model.User;
import com.project.planpulse.repository.PasswordResetTokenRepository;
import com.project.planpulse.repository.UserRepository;
import com.project.planpulse.validation.PasswordValidator;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private EmailService emailService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads";

    // Register user with multipart (including optional profile image)
    public User registerUserWithMultipart(String firstName,
                                          String lastName,
                                          String username,
                                          String email,
                                          String password,
                                          String confirmPassword,
                                          MultipartFile profileImage) throws IOException {
        validateUserRegistrationFields(firstName, lastName, username, email, password, confirmPassword);
        if (userRepository.existsByUsername(username) || userRepository.existsByEmail(email)) {
            throw new RuntimeException("Username or Email already exists");
        }
        // If profile image is provided, store it
        String profileImageUrl = null;
        if (profileImage != null && !profileImage.isEmpty()) {
            profileImageUrl = storeProfileImage(profileImage);
        }

        User user = new User();
        user.setFirstname(firstName);
        user.setLastname(lastName);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setProfileImageUrl(profileImageUrl);
        return userRepository.save(user);
    }

    // Update user with multipart (including optional profile image)
    public User updateUserWithMultipart(String userId,
                                        String username,
                                        String email,
                                        String firstname,
                                        String lastname,
                                        MultipartFile profileImage) throws IOException, RuntimeException {
        User existingUser = getUserById(userId);
        // Update fields if provided
        if (username != null && !username.isBlank()) {
            if (!existingUser.getUsername().equals(username) && userRepository.existsByUsername(username)) {
                throw new RuntimeException("Username already taken");
            }
            existingUser.setUsername(username);
        }
        if (email != null && !email.isBlank()) {
            if (!existingUser.getEmail().equals(email) && userRepository.existsByEmail(email)) {
                throw new RuntimeException("Email already in use");
            }
            existingUser.setEmail(email);
        }
        if (firstname != null && !firstname.isBlank()) {
            existingUser.setFirstname(firstname);
        }
        if (lastname != null && !lastname.isBlank()) {
            existingUser.setLastname(lastname);
        }
        // handle profile image update if new image is provided
        if (profileImage != null && !profileImage.isEmpty()) {
            String oldImageUrl = existingUser.getProfileImageUrl();
            // store the new image first
            String newImageUrl = storeProfileImage(profileImage);
            // delete old image if it exists
            if (oldImageUrl != null && !oldImageUrl.isBlank()) {
                deleteOldProfileImage(oldImageUrl);
            }
            // update user with the new URL
            existingUser.setProfileImageUrl(newImageUrl);
        }
        return userRepository.save(existingUser);
    }

    private void validateUserRegistrationFields(String firstName, String lastName, String username, String email, String password, String confirmPassword) {
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
        if (!password.equals(confirmPassword)) {
            throw new RuntimeException("Password and confirmation password do not match");
        }
    }

    private String storeProfileImage(MultipartFile file) throws IOException, RuntimeException {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty. Please upload a valid image.");
        }
        // validate MIME type
        String contentType = file.getContentType();
        if (contentType == null || !isValidImageMimeType(contentType)) {
            throw new RuntimeException("Invalid file type. Only image files are allowed.");
        }
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !hasValidImageExtension(originalFilename)) {
            throw new RuntimeException("Invalid file extension. Supported formats are: .jpg, .jpeg, .png, .gif.");
        }
        // unique filename generated
        String extension = "";
        if (originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
        }
        String uniqueFilename = UUID.randomUUID() + "_" + System.currentTimeMillis() + extension;
        // create directory if it does not exist
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            boolean uploadResult = uploadDir.mkdirs();
            if (!uploadResult) throw new IOException("Failed to create upload directory: " + UPLOAD_DIR);
        }
        // save file to the uploads directory
        Path filePath = Paths.get(UPLOAD_DIR, uniqueFilename);
        Files.write(filePath, file.getBytes(), StandardOpenOption.CREATE_NEW);
        System.out.println("File saved to: " + filePath.toAbsolutePath());
        // relative URL for storage in the database
        return "/uploads/" + uniqueFilename;
    }

    private boolean isValidImageMimeType(String mimeType) {
        return mimeType.equals("image/jpeg") ||
                mimeType.equals("image/png") ||
                mimeType.equals("image/gif") ||
                mimeType.equals("image/webp") ||
                mimeType.equals("image/bmp");
    }

    private boolean hasValidImageExtension(String filename) {
        String lowerCaseFilename = filename.toLowerCase();
        return lowerCaseFilename.endsWith(".jpg") ||
                lowerCaseFilename.endsWith(".jpeg") ||
                lowerCaseFilename.endsWith(".png") ||
                lowerCaseFilename.endsWith(".gif") ||
                lowerCaseFilename.endsWith(".webp") ||
                lowerCaseFilename.endsWith(".bmp");
    }

    private void deleteOldProfileImage(String imageUrl) {
        // /uploads/filename.extension - file format processed
        if (!imageUrl.startsWith("/uploads/")) {
            return;
        }
        String filename = imageUrl.substring("/uploads/".length());
        Path oldFilePath = Paths.get(UPLOAD_DIR, filename);
        try {
            Files.deleteIfExists(oldFilePath);
            System.out.println("Deleted old profile image: " + oldFilePath.toAbsolutePath());
        } catch (IOException e) {
            System.err.println("Failed to delete old profile image: " + oldFilePath.toString() + " - " + e.getMessage());
        }
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

    public User getUserById(String userId) throws RuntimeException {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public void deleteUser(String userId) throws RuntimeException {
        User user = getUserById(userId);
        if (user != null) {
            // delete user's profile image if exists
            String imageUrl = user.getProfileImageUrl();
            if (imageUrl != null && !imageUrl.isBlank()) {
                deleteOldProfileImage(imageUrl);
            }
            userRepository.deleteById(userId);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void initiatePasswordReset(String email) throws RuntimeException {
        User user = getUserByEmail(email);
        if (user == null) {
            throw new RuntimeException("Invalid credentials.");
        }
        PasswordResetToken resetToken = new PasswordResetToken(user.getId(), 15);
        passwordResetTokenRepository.save(resetToken);
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
            passwordResetTokenRepository.delete(resetToken);
            throw new RuntimeException("Token has expired");
        }
        User user = getUserById(resetToken.getUserId());
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        passwordResetTokenRepository.delete(resetToken);
    }

    public void resetPassword(@Valid User user, String currentPassword, String newPassword, String confirmPassword) throws RuntimeException {
        if (newPassword == null || newPassword.isBlank()) {
            throw new RuntimeException("New password cannot be empty");
        }
        if (!newPassword.equals(confirmPassword)) {
            throw new RuntimeException("New password and confirmation do not match");
        }
        if (!isValidPassword(newPassword)) {
            throw new RuntimeException("Password does not meet requirements");
        }
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        String hashedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(hashedPassword);
        userRepository.save(user);
    }

    private boolean isValidPassword(String password) {
        PasswordValidator validator = new PasswordValidator();
        return validator.isValid(password, null);
    }

}
