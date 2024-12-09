package com.project.planpulse.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Date;

@Data
@NoArgsConstructor
@Document(collection = "boards")
public class Board {
    @Id
    private String id;
    private String title;
    private String type = "PUBLIC"; // PRIVATE or PUBLIC
    private String creatorId;
    private List<String> collaboratorIds; // Users who can modify tasks
    private List<String> taskIds; // Tasks in this board
    private Date createdAt = new Date();
    private Date updatedAt = new Date();
}
