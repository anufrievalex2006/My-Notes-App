package com.notesapp.backend.repos;

import com.notesapp.backend.models.api.NoteAccess;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface NoteAccessRepo extends JpaRepository<NoteAccess, UUID> {
    Optional<NoteAccess> findByNoteIdAndUserId(UUID noteId, UUID userId);
    boolean existsByNoteIdAndUserId(UUID noteId, UUID userId);
}
