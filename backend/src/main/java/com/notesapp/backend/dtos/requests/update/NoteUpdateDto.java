package com.notesapp.backend.dtos.requests.update;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoteUpdateDto {
    private String title;
    private String content;
    private boolean isPublic;
}
