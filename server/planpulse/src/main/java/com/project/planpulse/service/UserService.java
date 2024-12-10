package com.project.planpulse.service;

import com.project.planpulse.model.Board;
import com.project.planpulse.model.PasswordResetToken;
import com.project.planpulse.model.Task;
import com.project.planpulse.model.User;
import com.project.planpulse.repository.BoardRepository;
import com.project.planpulse.repository.PasswordResetTokenRepository;
import com.project.planpulse.repository.TaskRepository;
import com.project.planpulse.repository.UserRepository;
import com.project.planpulse.validation.PasswordValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private CloudStorageService cloudStorageService;

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
        /*
        // Local code:
        if (profileImage != null && !profileImage.isEmpty()) {
            profileImageUrl = storeProfileImage(profileImage);
        }
        */

        // Cloud version
        if (profileImage != null && !profileImage.isEmpty()) {
            String destination = String.format("uploads/%s-%s", UUID.randomUUID(), profileImage.getOriginalFilename());
            profileImageUrl = cloudStorageService.uploadFile(profileImage, destination);
        }

        User user = new User();
        user.setFirstname(firstName);
        user.setLastname(lastName);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setProfileImageUrl(profileImageUrl);
        user.setBoardIds(new ArrayList<>());
        return userRepository.save(user);
    }

    // Update user with multipart (including optional profile image)
    public Map<String, Object> updateUserWithMultipart(String userId,
                                                       String username,
                                                       String email,
                                                       String firstname,
                                                       String lastname,
                                                       MultipartFile profileImage) throws IOException, RuntimeException {
        Map<String, Object> userInfo = getUserById(userId);
        User existingUser = (User) userInfo.get("user");
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

        /*
        // Local code:
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
        */

        // handle profile image update if new image is provided
        if (profileImage != null && !profileImage.isEmpty()) {
            String oldImageUrl = existingUser.getProfileImageUrl();
            String destination = String.format("uploads/%s-%s", UUID.randomUUID(), profileImage.getOriginalFilename());
            String newImageUrl = cloudStorageService.uploadFile(profileImage, destination);

            // delete the old image from Cloud Storage if it exists
            if (oldImageUrl != null && !oldImageUrl.isBlank()) {
                String oldFileName = oldImageUrl.substring(oldImageUrl.lastIndexOf("/") + 1);
                cloudStorageService.deleteFile("uploads/" + oldFileName);
            }

            // update the user profile image URL
            existingUser.setProfileImageUrl(newImageUrl);
        }

        userInfo.put("user", userRepository.save(existingUser));
        return userInfo;
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
        if (!isValidPassword(password)) {
            throw new RuntimeException("Password does not meet requirements");
        }
    }

    /*
    // Local version not using google cloud
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
        // validate file content (magic number check)
        if (!isValidImageMagicNumber(file)) {
            throw new RuntimeException("Uploaded file is not a valid image.");
        }
        // unique filename generation below
        String extension = originalFilename.contains(".") ? originalFilename.substring(originalFilename.lastIndexOf('.')) : "";
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
     */

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

    private boolean isValidImageMagicNumber(MultipartFile file) throws IOException {
        byte[] headerBytes = new byte[8];
        try (var inputStream = file.getInputStream()) {
            if (inputStream.read(headerBytes) < 8) {
                return false; // File too small to be valid
            }
        }

        // JPEG: FF D8 FF
        if (headerBytes[0] == (byte) 0xFF && headerBytes[1] == (byte) 0xD8 && headerBytes[2] == (byte) 0xFF) {
            return true;
        }
        // PNG: 89 50 4E 47 0D 0A 1A 0A
        if (headerBytes[0] == (byte) 0x89 && headerBytes[1] == (byte) 0x50 &&
                headerBytes[2] == (byte) 0x4E && headerBytes[3] == (byte) 0x47 &&
                headerBytes[4] == (byte) 0x0D && headerBytes[5] == (byte) 0x0A &&
                headerBytes[6] == (byte) 0x1A && headerBytes[7] == (byte) 0x0A) {
            return true;
        }
        // GIF: 47 49 46 38
        if (headerBytes[0] == (byte) 0x47 && headerBytes[1] == (byte) 0x49 &&
                headerBytes[2] == (byte) 0x46 && headerBytes[3] == (byte) 0x38) {
            return true;
        }
        // BMP: 42 4D
        if (headerBytes[0] == (byte) 0x42 && headerBytes[1] == (byte) 0x4D) {
            return true;
        }

        // Unsupported file type
        return false;
    }

    /*
    // Local version (not using google cloud)
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
            System.err.println("Failed to delete old profile image: " + oldFilePath + " - " + e.getMessage());
        }
    }
     */

    public User authenticateByUsername(String username, String password) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Invalid login credentials"));
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public User authenticateByEmail(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid login credentials"));
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public Map<String, Object> getUserById(String userId) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // retrieve the profile image as a Resource from cloud
        Resource profileImage = null;
        String profileImageUrl = user.getProfileImageUrl();

        if (profileImageUrl != null && !profileImageUrl.isBlank()) {
            try {
                String fileName = profileImageUrl.substring(profileImageUrl.lastIndexOf("/") + 1);
                profileImage = cloudStorageService.downloadFile(fileName);
            } catch (Exception e) {
                throw new RuntimeException("Failed to load profile image: " + e.getMessage());
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("profileImage", profileImage);
        return response;
    }

//    public User getUserByEmail(String email, String requesterId) {
//        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Resource not found"));
//        if (!user.getId().equals(requesterId)) {
//            throw new RuntimeException("Unauthorized access");
//        }
//        return user;
//    }

    public void deleteUser(String userId) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // delete user's profile image if exists from cloud
        String imageUrl = user.getProfileImageUrl();
        if (imageUrl != null && !imageUrl.isBlank()) {
            String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            cloudStorageService.deleteFile("uploads/" + fileName);
        }

        // get all boards created by the user
        List<Board> boards = boardRepository.findByCreatorId(user.getId());

        // delete associated tasks and update collaborators
        for (Board board : boards) {
            // delete all tasks associated with the board
            List<Task> tasks = taskRepository.findByBoardId(board.getId());
            taskRepository.deleteAll(tasks);

            // update collaborators for the board
            List<String> collaboratorIds = board.getCollaboratorIds();
            if (collaboratorIds != null && !collaboratorIds.isEmpty()) {
                for (String collaboratorId : collaboratorIds) {
                    userRepository.findById(collaboratorId).ifPresent(collaborator -> {
                        if (collaborator.getBoardIds() != null) {
                            collaborator.getBoardIds().remove(board.getId());
                            userRepository.save(collaborator);
                        }
                    });
                }
            }
        }

        // delete all boards created by the user
        boardRepository.deleteAll(boards);

        // then delete the user
        userRepository.deleteById(userId);
    }

    public void initiatePasswordReset(String email) throws RuntimeException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid credentials"));
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
        User user = userRepository.findById(resetToken.getUserId()).orElseThrow(() -> new RuntimeException("Invalid token or credentials"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        passwordResetTokenRepository.delete(resetToken);
    }

    public void resetPassword(User user, String currentPassword, String newPassword, String confirmPassword) throws RuntimeException {
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

    public User getUserByEmail(String email, String requesterId) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!user.getId().equals(requesterId)) {
            throw new RuntimeException("Unauthorized access");
        }
        return user;
    }
}
