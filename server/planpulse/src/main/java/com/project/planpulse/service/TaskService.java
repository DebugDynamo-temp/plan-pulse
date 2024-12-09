package com.project.planpulse.service;

import com.project.planpulse.model.Board;
import com.project.planpulse.model.Task;
import com.project.planpulse.repository.BoardRepository;
import com.project.planpulse.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // create a new task
    public Task createTask(Task task) {
        task.setCreatedAt(new Date());
        task.setUpdatedAt(new Date());
        task.setStatus("TO_DO");
        return taskRepository.save(task);
    }

    public Task getTaskById(String taskId) {
        return taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    // retrieve all tasks for a given board
    public List<Task> getTasksByBoard(String boardId) {
        return taskRepository.findByBoardId(boardId);
    }

    // update the task's status
    public Task updateTaskStatus(String taskId, String status) {
        Task task = getTaskById(taskId);
        validateStatusTransition(task.getStatus(), status);
        task.setStatus(status);
        task.setUpdatedAt(new Date());
        return taskRepository.save(task);
    }

    // Track time spent on a task
    public Task trackTime(String taskId, long minutes) {
        Task task = getTaskById(taskId);
        task.setTimeSpent(task.getTimeSpent() + minutes);
        task.setUpdatedAt(new Date());
        return taskRepository.save(task);
    }

    private void validateStatusTransition(String currentStatus, String newStatus) {
        switch (currentStatus) {
            case "TO_DO":
                if (!newStatus.equals("IN_PROGRESS")) {
                    throw new RuntimeException("Invalid transition: TO_DO can only move to IN_PROGRESS");
                }
                break;
            case "IN_PROGRESS":
                if (!List.of("IN_REVIEW", "DONE").contains(newStatus)) {
                    throw new RuntimeException("Invalid transition: IN_PROGRESS can only move to IN_REVIEW or DONE");
                }
                break;
            case "IN_REVIEW":
                if (!newStatus.equals("DONE")) {
                    throw new RuntimeException("Invalid transition: IN_REVIEW can only move to DONE");
                }
                break;
            case "DONE":
                throw new RuntimeException("DONE is a terminal status and cannot transition further");
            default:
                throw new RuntimeException("Unknown current status: " + currentStatus);
        }
    }
}
