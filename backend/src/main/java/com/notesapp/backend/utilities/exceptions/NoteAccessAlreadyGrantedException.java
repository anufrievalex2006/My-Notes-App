package com.notesapp.backend.utilities.exceptions;

public class NoteAccessAlreadyGrantedException extends RuntimeException {
  public NoteAccessAlreadyGrantedException(String message) {
    super(message);
  }
}
