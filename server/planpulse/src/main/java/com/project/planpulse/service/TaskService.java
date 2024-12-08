package com.project.planpulse.service;

import com.project.planpulse.model.Task;
import com.project.planpulse.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(Task task) {
        task.setCreatedAt(new Date());
        task.setUpdatedAt(new Date());
        return taskRepository.save(task);
    }

    public Task getTaskById(String id) {
        return taskRepository.findById(id).orElse(null);
    }

    public List<Task> getTasksByBoard(String boardId) {
        return taskRepository.findByBoardId(boardId);
    }

    public List<Task> getTasksByAssignee(String assigneeId) {
        return taskRepository.findByAssigneeId(assigneeId);
    }

    public void updateTaskStatus(String taskId, String status) {
        Task task = getTaskById(taskId);
        if (task != null) {
            validateStatusTransition(task.getStatus(), status);
            task.setStatus(status);
            task.setUpdatedAt(new Date());
            taskRepository.save(task);
        } else {
            throw new RuntimeException("Task not found");
        }
    }

    public void trackTime(String taskId, long minutes) {
        Task task = getTaskById(taskId);
        if (task != null) {
            task.setTimeSpent(task.getTimeSpent() + minutes);
            task.setUpdatedAt(new Date());
            taskRepository.save(task);
        } else {
            throw new RuntimeException("Task not found");
        }
    }

    private void validateStatusTransition(String currentStatus, String newStatus) {
        switch (currentStatus) {
            case "TO_DO":
                if (!newStatus.equals("IN_PROGRESS")) {
                    throw new RuntimeException("Invalid status transition: TO_DO can only transition to IN_PROGRESS");
                }
                break;

            case "IN_PROGRESS":
                if (!List.of("IN_REVIEW", "DONE").contains(newStatus)) {
                    throw new RuntimeException("Invalid status transition: IN_PROGRESS can only transition to IN_REVIEW or DONE");
                }
                break;

            case "IN_REVIEW":
                if (!newStatus.equals("DONE")) {
                    throw new RuntimeException("Invalid status transition: IN_REVIEW can only transition to DONE");
                }
                break;

            case "DONE":
                throw new RuntimeException("Invalid status transition: DONE is a terminal status and cannot transition to any other status");

            default:
                throw new RuntimeException("Unknown current status: " + currentStatus);
        }
    }
}
