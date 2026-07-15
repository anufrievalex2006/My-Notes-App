package com.notesapp.backend.dtos.requests.create;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoteCreateDto {
    private String title;
    private String content;
    private boolean isPublic;
}
