package com.project.planpulse.service;

import com.project.planpulse.model.Board;
import com.project.planpulse.model.Task;
import com.project.planpulse.model.User;
import com.project.planpulse.repository.BoardRepository;
import com.project.planpulse.repository.TaskRepository;
import com.project.planpulse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    public List<Board> getBoardsForUser(String userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        return boardRepository.findByCreatorId(userId);
    }

    public Board createBoard(Board board, String userId) {
        board.setCreatedAt(new Date());
        board.setUpdatedAt(new Date());
        board.setCreatorId(userId);
        board = boardRepository.save(board);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.getBoardIds().add(board.getId());
        userRepository.save(user);
        return board;
    }

    public Board getBoardById(String boardId) {
        return boardRepository.findById(boardId).orElseThrow(() -> new RuntimeException("Board not found"));
    }

    // add a collaborator by email or username
    public Board addCollaborator(String requesterId, String boardId, String identifier) {
        Board board = getBoardById(boardId);
        // must have permission
        validateAddPermission(board, requesterId);
        User user;
        if (isEmail(identifier)) {
            user = userRepository.findByEmail(identifier).orElse(null);
        } else {
            user = userRepository.findByUsername(identifier).orElse(null);
        }

        if (user == null) {
            throw new RuntimeException("Invalid user credentials.");
        }

        if (!board.getCollaboratorIds().contains(user.getId())) {
            board.getCollaboratorIds().add(user.getId());
            board.setUpdatedAt(new Date());
            board = boardRepository.save(board);
            user.getBoardIds().add(board.getId());
            userRepository.save(user);
            return board;
        } else {
            throw new RuntimeException("The user already has access to the board.");
        }
    }

    // add a new task to a board
    public Task addTaskToBoard(String boardId, Task newTask, String requesterId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found"));

        // requester must have permission to the board
        validateAddPermission(board, requesterId);

        newTask.setBoardId(boardId);
        newTask.setReporterId(requesterId);
        newTask.setCreatedAt(new Date());
        newTask.setUpdatedAt(new Date());
        Task savedTask = taskRepository.save(newTask);

        // adding the task ID to the board's taskIds
        board.getTaskIds().add(savedTask.getId());
        board.setUpdatedAt(new Date());
        boardRepository.save(board);

        return savedTask;
    }

    private void validateAddPermission(Board board, String requesterId) {
        if (!board.getCreatorId().equals(requesterId) &&
                (board.getCollaboratorIds() == null || !board.getCollaboratorIds().contains(requesterId))) {
            throw new RuntimeException("Permission denied: The user does not have access to add to this board.");
        }
    }

    private boolean isEmail(String identifier) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return identifier.matches(emailRegex);
    }
}
