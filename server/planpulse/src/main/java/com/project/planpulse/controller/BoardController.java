package com.project.planpulse.controller;

import com.project.planpulse.model.Board;
import com.project.planpulse.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @PostMapping("/create")
    public ResponseEntity<Board> createBoard(@RequestBody Board board) {
        Board createdBoard = boardService.createBoard(board);
        return ResponseEntity.ok(createdBoard);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<Board> getBoardById(@PathVariable String boardId) {
        return boardService.findBoardById(boardId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{creatorId}")
    public ResponseEntity<List<Board>> getBoardsByUser(@PathVariable String creatorId) {
        return ResponseEntity.ok(boardService.findBoardsByCreatorId(creatorId));
    }

    @PutMapping("/update")
    public ResponseEntity<Board> updateBoard(@RequestBody Board board) {
        boardService.updateBoard(board);
        return ResponseEntity.ok(board);
    }
}
