package com.project.planpulse.service;

import com.project.planpulse.model.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    Task createTask(Task task);

    Optional<Task> findTaskById(String taskId);

    List<Task> findTasksByBoardId(String boardId);

    void updateTask(Task task);
}
