package com.project.planpulse.controller;

import com.project.planpulse.model.Board;
import com.project.planpulse.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boards")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @PostMapping
    public Board createBoard(@RequestBody Board board) {
        return boardService.createBoard(board);
    }

    @GetMapping("/{id}")
    public Board getBoardById(@PathVariable String id) {
        return boardService.getBoardById(id);
    }

    @GetMapping("/creator/{creatorId}")
    public List<Board> getBoardsByCreator(@PathVariable String creatorId) {
        return boardService.getBoardsByCreator(creatorId);
    }

    @PostMapping("/{boardId}/collaborators")
    public void addCollaborator(@PathVariable String boardId, @RequestBody String userId) {
        boardService.addCollaborator(boardId, userId);
    }
}
