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


    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable String id) {
        return taskService.getTaskById(id);
    }

    @GetMapping("/board/{boardId}")
    public List<Task> getTasksByBoard(@PathVariable String boardId) {
        return taskService.getTasksByBoard(boardId);
    }

    @PutMapping("/{taskId}/status")
    public Task updateTaskStatus(@PathVariable String taskId, @RequestBody String status) {
        return taskService.updateTaskStatus(taskId, status);
    }

    @PostMapping("/{taskId}/time")
    public Task trackTime(@PathVariable String taskId, @RequestBody long minutes) {
        return taskService.trackTime(taskId, minutes);
    }
}
