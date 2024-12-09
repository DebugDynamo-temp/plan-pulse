package com.project.planpulse.controller;

import com.project.planpulse.model.Board;
import com.project.planpulse.model.Task;
import com.project.planpulse.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boards")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/all")
    public List<Board> getBoardsForUser(Authentication authentication) {
        String userId = authentication.getName();
        return boardService.getBoardsForUser(userId);
    }

    @PostMapping("/create-board")
    public Board createBoard(@RequestBody Board board, Authentication authentication) {
        String requesterId = authentication.getName();
        return boardService.createBoard(board, requesterId);
    }

    @GetMapping("/{id}")
    public Board getBoardById(@PathVariable String id) {
        return boardService.getBoardById(id);
    }

    @PostMapping("/add-user/{boardId}")
    public Board giveAccessToUser(@PathVariable String boardId, @RequestBody String identifier, Authentication authentication) {
        String requesterId = authentication.getName();
        return boardService.addCollaborator(requesterId, boardId, identifier);
    }

    @PostMapping("/add-task/{boardId}")
    public Task addTaskToBoard(@PathVariable String boardId, @RequestBody Task task, Authentication authentication) {
        String requesterId = authentication.getName();
        return boardService.addTaskToBoard(boardId, task, requesterId);
    }
}
