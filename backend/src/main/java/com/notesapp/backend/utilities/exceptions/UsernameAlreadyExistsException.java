package com.notesapp.backend.utilities.exceptions;

public class UsernameAlreadyExistsException extends RuntimeException {
    public UsernameAlreadyExistsException(String username) {
        super("Пользователь с именем '" + username + "' уже существует");
    }
}
