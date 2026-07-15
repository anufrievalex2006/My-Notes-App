package com.notesapp.backend.utilities.exceptions;

public class NoteAccessDeniedException extends RuntimeException {
    public NoteAccessDeniedException() {
        super("У вас нет доступа к этой заметке");
    }
}
