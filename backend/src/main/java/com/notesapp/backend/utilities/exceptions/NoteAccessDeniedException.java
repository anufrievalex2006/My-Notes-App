package com.notesapp.backend.utilities.exceptions;

public class NoteAccessDeniedException extends RuntimeException {
  public NoteAccessDeniedException(String message) {
    super(message);
  }
}
