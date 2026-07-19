package com.notesapp.backend.repos;

import com.notesapp.backend.models.api.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NoteRepo extends JpaRepository<Note, UUID> {
    List<Note> findByAuthorId(UUID authorId);
    List<Note> findByIsPublicTrueAndAuthorIdNot(UUID authorId);
}
