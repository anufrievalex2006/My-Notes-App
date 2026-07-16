package com.notesapp.backend.controllers;

import com.notesapp.backend.dtos.requests.update.UserUpdateDto;
import com.notesapp.backend.dtos.responses.UserPublicResponse;
import com.notesapp.backend.dtos.responses.UserResponse;
import com.notesapp.backend.models.api.User;
import com.notesapp.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    @GetMapping
    public ResponseEntity<List<UserPublicResponse>> get() {
        return ResponseEntity.ok(service.get());
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserPublicResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getById(id));
    }
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getProfile(@AuthenticationPrincipal User cur) {
        return ResponseEntity.ok(service.getProfile(cur));
    }
    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateProfile(
            @Valid @RequestBody UserUpdateDto req,
            @AuthenticationPrincipal User cur
    ) {
        return ResponseEntity.ok(service.update(req, cur));
    }
}
