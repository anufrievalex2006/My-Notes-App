package com.notesapp.backend.dtos.responses;

import lombok.*;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserPublicResponse {
    private UUID id;
    private String username;
    private String avatarUrl;
}
