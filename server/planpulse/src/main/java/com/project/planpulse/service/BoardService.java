package com.project.planpulse.service;

import com.project.planpulse.model.Board;
import com.project.planpulse.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }

    public Board getBoardById(String id) {
        return boardRepository.findById(id).orElse(null);
    }

    public List<Board> getBoardsByCreator(String creatorId) {
        return boardRepository.findByCreatorId(creatorId);
    }

    public List<Board> getBoardsForCollaborator(String userId) {
        return boardRepository.findByCollaboratorIdsContaining(userId);
    }

    public void addCollaborator(String boardId, String userId) {
        Board board = getBoardById(boardId);
        if (board != null && !board.getCollaboratorIds().contains(userId)) {
            board.getCollaboratorIds().add(userId);
            board.setUpdatedAt(new java.util.Date());
            boardRepository.save(board);
        }
    }
}
