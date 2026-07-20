package com.notesapp.backend.dtos.requests.update;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Здесь Вы должны предусмотреть автоматическую подстановку уже имеющихся значений при обновлении заметки")
public class NoteUpdateDto {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Введите заголовок к заметке")
    @Size(max = 100, message = "Заголовок к заметке не может превышать 100 символов")
    private String title;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "Содержимое заметки не может быть null, нужна хотя бы пустая строка")
    @Size(max = 10000, message = "Слишком длинный текст заметки (не более 10000 символов!)")
    private String content;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "Укажите статус публичности заметки")
    private Boolean isPublic;
}
