package com.notesapp.backend.controllers;

import com.notesapp.backend.dtos.requests.create.NoteCreateDto;
import com.notesapp.backend.dtos.requests.update.NoteUpdateDto;
import com.notesapp.backend.dtos.responses.NoteResponse;
import com.notesapp.backend.models.api.User;
import com.notesapp.backend.services.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService service;

    @GetMapping
    public ResponseEntity<List<NoteResponse>> getMy(@AuthenticationPrincipal User cur) {
        return ResponseEntity.ok(service.getMy(cur));
    }
    @GetMapping("/shared")
    public ResponseEntity<List<NoteResponse>> getShared(@AuthenticationPrincipal User cur) {
        return ResponseEntity.ok(service.getShared(cur));
    }
    @GetMapping("/public")
    public ResponseEntity<List<NoteResponse>> getPublic(@AuthenticationPrincipal User cur) {
        return ResponseEntity.ok(service.getPublic(cur));
    }
    @GetMapping("/{id}")
    public ResponseEntity<NoteResponse> getById(
            @PathVariable UUID id,
            @AuthenticationPrincipal User cur
    ) {
        return ResponseEntity.ok(service.getById(id, cur));
    }
    @PostMapping
    public ResponseEntity<NoteResponse> create(
            @Valid @RequestBody NoteCreateDto req,
            @AuthenticationPrincipal User cur
    ) {
        return ResponseEntity.ok(service.create(req, cur));
    }
    @PutMapping("/{id}")
    public ResponseEntity<NoteResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody NoteUpdateDto req,
            @AuthenticationPrincipal User cur
    ) {
        return ResponseEntity.ok(service.update(id, req, cur));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id,
            @AuthenticationPrincipal User cur
    ) {
        service.delete(id, cur);
        return ResponseEntity.noContent().build();
    }
}
