package com.notesapp.backend.controllers;

import com.notesapp.backend.dtos.requests.create.LoginDto;
import com.notesapp.backend.dtos.requests.create.RegisterDto;
import com.notesapp.backend.dtos.responses.TokenResponse;
import com.notesapp.backend.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterDto req) {
        TokenResponse res = service.register(req);
        return withCookie(res.getToken());
    }
    @PostMapping("/login")
    public ResponseEntity<Void> login(@Valid @RequestBody LoginDto req) {
        TokenResponse res = service.login(req);
        return withCookie(res.getToken());
    }
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build();
    }

    private ResponseEntity<Void> withCookie(String token) {
        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofDays(1))
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build();
    }
}
