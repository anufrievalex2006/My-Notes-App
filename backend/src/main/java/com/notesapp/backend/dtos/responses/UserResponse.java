package com.notesapp.backend.dtos.responses;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private UUID id;
    private String username;
    private String avatarUrl;
    private LocalDateTime createdAt;
    private List<NoteResponse> notes;
}
