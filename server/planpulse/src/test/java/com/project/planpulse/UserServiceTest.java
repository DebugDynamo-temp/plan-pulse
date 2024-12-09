import com.project.planpulse.model.User;
import com.project.planpulse.repository.UserRepository;
import com.project.planpulse.repository.PasswordResetTokenRepository;
import com.project.planpulse.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Mock
    private MultipartFile mockFile;

    @Test
    void registerUserWithValidProfileImage_success() throws IOException {
        String firstName = "Test";
        String lastName = "User";
        String username = "test_user";
        String email = "testuser@gmail.com";
        String password = "t!";
        String confirmPassword = "StrongPassword123!";
        when(userRepository.existsByUsername(username)).thenReturn(false);
        when(userRepository.existsByEmail(email)).thenReturn(false);
        when(mockFile.isEmpty()).thenReturn(false);
        when(mockFile.getContentType()).thenReturn("image/jpeg");
        when(mockFile.getOriginalFilename()).thenReturn("profile.jpg");
        doReturn(new byte[0]).when(mockFile).getBytes();

        // Act
        User user = userService.registerUserWithMultipart(firstName, lastName, username, email, password, confirmPassword, mockFile);

        // Assert
        assertNotNull(user);
        assertEquals(firstName, user.getFirstname());
        assertEquals(email, user.getEmail());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void registerUserWithDuplicateEmail_throwsException() {
        String username = "johndoe";
        String email = "johndoe@example.com";
        when(userRepository.existsByEmail(email)).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                userService.registerUserWithMultipart("John", "Doe", username, email, "password123", "password123", null));
        assertEquals("Username or Email already exists", exception.getMessage());
    }

    @Test
    void updateUserWithNewProfileImage_success() throws IOException {
        String userId = "user123";
        String newUsername = "newusername";
        when(userRepository.findById(userId)).thenReturn(Optional.of(new User()));
        when(mockFile.isEmpty()).thenReturn(false);
        when(mockFile.getContentType()).thenReturn("image/jpeg");
        when(mockFile.getOriginalFilename()).thenReturn("newimage.jpg");
        doReturn(new byte[0]).when(mockFile).getBytes();

        User updatedUser = userService.updateUserWithMultipart(userId, newUsername, null, null, null, mockFile);
        assertNotNull(updatedUser);
        assertEquals(newUsername, updatedUser.getUsername());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void updateUserWithInvalidImageType_throwsException() {
        String userId = "user123";
        when(userRepository.findById(userId)).thenReturn(Optional.of(new User()));
        when(mockFile.getContentType()).thenReturn("application/pdf");

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                userService.updateUserWithMultipart(userId, null, null, null, null, mockFile));
        assertEquals("Invalid file type. Only image files are allowed.", exception.getMessage());
    }
}
