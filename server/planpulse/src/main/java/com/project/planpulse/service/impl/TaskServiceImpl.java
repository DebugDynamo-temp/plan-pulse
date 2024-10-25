package com.project.planpulse.service.impl;

import com.project.planpulse.model.Task;
import com.project.planpulse.repository.TaskRepository;
import com.project.planpulse.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Optional<Task> findTaskById(String taskId) {
        return taskRepository.findById(taskId);
    }

    @Override
    public List<Task> findTasksByBoardId(String boardId) {
        return taskRepository.findByBoardId(boardId);
    }

    @Override
    public void updateTask(Task task) {
        task.setUpdatedAt(new java.util.Date());
        taskRepository.save(task);
    }
}
