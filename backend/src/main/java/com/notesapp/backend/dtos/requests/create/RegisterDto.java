package com.notesapp.backend.dtos.requests.create;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.validator.constraints.URL;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Данные для регистрации нового пользователя")
public class RegisterDto {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Введите имя пользователя")
    @Size(min = 2, max = 100, message = "Имя пользователя должно быть длиной от 2 до 100 символов")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Имя пользователя может содержать только латинские буквы, цифры и символ подчеркивания (\"_\")")
    private String username;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Введите пароль")
    @Size(min = 8, message = "Пароль должен содержать не менее 8 символов")
    private String password;
    @Schema(nullable = true)
    @URL(message = "Аватар должен представлять из себя корректную URL-ссылку")
    private String avatarUrl;
}
