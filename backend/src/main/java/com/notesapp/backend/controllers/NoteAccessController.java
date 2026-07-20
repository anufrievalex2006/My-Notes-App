package com.notesapp.backend.controllers;

import com.notesapp.backend.dtos.responses.NoteAccessResponse;
import com.notesapp.backend.models.api.User;
import com.notesapp.backend.services.NoteAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notes/{noteId}/access")
@RequiredArgsConstructor
public class NoteAccessController {
    private final NoteAccessService service;

    @GetMapping
    public ResponseEntity<List<NoteAccessResponse>> get(
            @PathVariable UUID noteId,
            @AuthenticationPrincipal User cur
    ) {
        return ResponseEntity.ok(service.getForNote(noteId, cur));
    }
    @PostMapping("/{userId}")
    public ResponseEntity<NoteAccessResponse> grantAccess(
            @PathVariable UUID noteId,
            @PathVariable UUID userId,
            @AuthenticationPrincipal User cur
    ) {
        NoteAccessResponse res = service.grant(noteId, userId, cur);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> revokeAccess(
            @PathVariable UUID noteId,
            @PathVariable UUID userId,
            @AuthenticationPrincipal User cur
    ) {
        service.revoke(noteId, userId, cur);
        return ResponseEntity.noContent().build();
    }
}
