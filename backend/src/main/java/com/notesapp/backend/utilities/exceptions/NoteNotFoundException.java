package com.notesapp.backend.utilities.exceptions;

public class NoteNotFoundException extends RuntimeException {
    public NoteNotFoundException() {
        super("Заметка не найдена");
    }
}
