package com.notesapp.backend.dtos.responses;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoteAccessResponse {
    private UUID id;
    private UUID noteId;
    private UUID userId;
    private LocalDateTime grantedAt;
}
