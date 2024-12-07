package com.project.planpulse.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.planpulse.model.Task;
import com.project.planpulse.model.User;
import com.project.planpulse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class EventConsumer {
    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    private ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "planpulse-events", groupId = "planpulse-group")
    public void consumeEvent(String message) {
        try {
            Task task = objectMapper.readValue(message, Task.class);
            // Fetch user email
            Optional<User> userOpt = userRepository.findById(task.getAssigneeId());
            if (userOpt.isEmpty()) throw new RuntimeException("Invalid user details!");
            String userEmail = userOpt.get().getEmail();
            // Send notification
            emailService.sendTaskNotification(userEmail, task);
        } catch (JsonMappingException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
