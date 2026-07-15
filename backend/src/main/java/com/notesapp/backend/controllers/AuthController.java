package com.notesapp.backend.controllers;

import com.notesapp.backend.dtos.requests.create.LoginDto;
import com.notesapp.backend.dtos.requests.create.RegisterDto;
import com.notesapp.backend.dtos.responses.TokenResponse;
import com.notesapp.backend.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<TokenResponse> register(@RequestBody RegisterDto req) {
        return ResponseEntity.ok(service.register(req));
    }
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginDto req) {
        return ResponseEntity.ok(service.login(req));
    }
}
