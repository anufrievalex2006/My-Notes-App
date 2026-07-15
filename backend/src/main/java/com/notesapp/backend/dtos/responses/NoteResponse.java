package com.notesapp.backend.dtos.responses;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoteResponse {
    private UUID id;
    private String title;
    private String content;
    private boolean isPublic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UUID authorId;
    private List<NoteAccessResponse> accesses;
}
