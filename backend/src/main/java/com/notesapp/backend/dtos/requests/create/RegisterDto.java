package com.notesapp.backend.dtos.requests.create;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
    private String username;
    private String password;
    private String avatarUrl;
}
