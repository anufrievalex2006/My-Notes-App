package com.notesapp.backend.utilities.exceptions;

import com.notesapp.backend.dtos.responses.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> onValidExceptions(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach(err -> {
            String fieldName = ((FieldError) err).getField();
            String msg = err.getDefaultMessage();
            errors.put(fieldName, msg);
        });
        ErrorResponse res = ErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error("Validation error")
                .message("Ошибка валидации полей")
                .validationErrors(errors)
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponse> onInvalidCredentials(InvalidCredentialsException e) {
        return buildResponse(HttpStatus.UNAUTHORIZED, e.getMessage());
    }
    @ExceptionHandler(NoteAccessDeniedException.class)
    public ResponseEntity<ErrorResponse> onAccessDenied(NoteAccessDeniedException e) {
        return buildResponse(HttpStatus.FORBIDDEN, e.getMessage());
    }
    @ExceptionHandler({NoteNotFoundException.class, UserNotFoundException.class})
    public ResponseEntity<ErrorResponse> onNotFound(RuntimeException e) {
        return buildResponse(HttpStatus.NOT_FOUND, e.getMessage());
    }
    @ExceptionHandler({UsernameAlreadyExistsException.class, NoteAccessAlreadyGrantedException.class})
    public ResponseEntity<ErrorResponse> onConflict(RuntimeException e) {
        return buildResponse(HttpStatus.CONFLICT, e.getMessage());
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> on(Exception e) {
        e.printStackTrace();
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Произошла внутренняя ошибка сервера. Пожалуйста, повторите попытку позже");
    }

    private ResponseEntity<ErrorResponse> buildResponse(HttpStatus status, String message) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .status(status.value())
                .error(status.getReasonPhrase())
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();

        return new ResponseEntity<>(errorResponse, status);
    }
}
