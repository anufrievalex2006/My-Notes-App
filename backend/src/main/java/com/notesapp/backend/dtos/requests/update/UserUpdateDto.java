package com.notesapp.backend.dtos.requests.update;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.validator.constraints.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Здесь Вы должны предусмотреть автоматическую подстановку уже имеющихся значений при обновлении заметки")
public class UserUpdateDto {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @Size(min = 2, max = 100, message = "Имя пользователя должно быть длиной от 2 до 100 символов")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Имя пользователя может содержать только латинские символы, цифры и символ подчеркивания (\"_\")")
    private String username;
    @Schema(nullable = true)
    @URL(message = "Аватар должен представлять собой корректную URL-ссылку")
    private String avatarUrl;
}
