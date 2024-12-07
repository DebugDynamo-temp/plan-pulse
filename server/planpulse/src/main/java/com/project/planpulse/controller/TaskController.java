package com.project.planpulse.controller;

import com.project.planpulse.model.Task;
import com.project.planpulse.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable String id) {
        return taskService.getTaskById(id);
    }

    @GetMapping("/board/{boardId}")
    public List<Task> getTasksByBoard(@PathVariable String boardId) {
        return taskService.getTasksByBoard(boardId);
    }

    @PostMapping("/{taskId}/status")
    public void updateTaskStatus(@PathVariable String taskId, @RequestBody String status) {
        taskService.updateTaskStatus(taskId, status);
    }

    @PostMapping("/{taskId}/time")
    public void trackTime(@PathVariable String taskId, @RequestBody long minutes) {
        taskService.trackTime(taskId, minutes);
    }
}
