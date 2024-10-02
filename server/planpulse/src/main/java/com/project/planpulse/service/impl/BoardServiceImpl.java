package com.project.planpulse.service.impl;

import com.project.planpulse.model.Board;
import com.project.planpulse.repository.BoardRepository;
import com.project.planpulse.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Override
    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }

    @Override
    public Optional<Board> findBoardById(String boardId) {
        return boardRepository.findById(boardId);
    }

    @Override
    public List<Board> findBoardsByCreatorId(String creatorId) {
        return boardRepository.findByCreatorId(creatorId);
    }

    @Override
    public void updateBoard(Board board) {
        board.setUpdatedAt(new java.util.Date());
        boardRepository.save(board);
    }
}
