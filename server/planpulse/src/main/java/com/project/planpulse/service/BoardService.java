package com.project.planpulse.service;

import com.project.planpulse.model.Board;

import java.util.List;
import java.util.Optional;

public interface BoardService {
    Board createBoard(Board board);

    Optional<Board> findBoardById(String boardId);

    List<Board> findBoardsByCreatorId(String creatorId);

    void updateBoard(Board board);
}
