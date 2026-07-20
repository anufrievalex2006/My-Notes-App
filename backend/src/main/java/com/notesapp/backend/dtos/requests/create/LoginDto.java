package com.notesapp.backend.dtos.requests.create;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Введите имя пользователя")
    private String username;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Введите пароль")
    private String password;
}
