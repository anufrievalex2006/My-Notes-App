package com.notesapp.backend.utilities.exceptions;

public class NoteNotFoundException extends RuntimeException {
  public NoteNotFoundException(String message) {
    super(message);
  }
}
