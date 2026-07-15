package com.notesapp.backend.utilities.exceptions;

public class NoteAccessAlreadyGrantedException extends RuntimeException {
    public NoteAccessAlreadyGrantedException() {
        super("У этого пользователя уже есть доступ к заметке!");
    }
}
