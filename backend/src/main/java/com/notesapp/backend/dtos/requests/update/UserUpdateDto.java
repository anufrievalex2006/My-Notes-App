package com.notesapp.backend.dtos.requests.update;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDto {
    private String username;
    private String avatarUrl;
}
