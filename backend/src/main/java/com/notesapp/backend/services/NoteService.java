package com.notesapp.backend.services;

import com.notesapp.backend.dtos.requests.create.NoteCreateDto;
import com.notesapp.backend.dtos.requests.update.NoteUpdateDto;
import com.notesapp.backend.dtos.responses.NoteAccessResponse;
import com.notesapp.backend.dtos.responses.NoteResponse;
import com.notesapp.backend.models.api.Note;
import com.notesapp.backend.models.api.User;
import com.notesapp.backend.repos.NoteAccessRepo;
import com.notesapp.backend.repos.NoteRepo;
import com.notesapp.backend.utilities.exceptions.NoteAccessDeniedException;
import com.notesapp.backend.utilities.exceptions.NoteNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepo repo;
    private final NoteAccessRepo accessRepo;

    @Transactional(readOnly = true)
    public List<NoteResponse> getMy(User curUser) {
        return repo.findByAuthorId(curUser.getId()).stream().map(this::toResponse).toList();
    }
    @Transactional(readOnly = true)
    public NoteResponse getById(UUID id, User curUser) {
        Note n = findNoteOrThrow(id);
        if (!canAccess(n, curUser))
            throw new NoteAccessDeniedException();

        return toResponse(n);
    }
    @Transactional
    public NoteResponse create(NoteCreateDto req, User curUser) {
        Note n = Note.builder()
                .title(req.getTitle())
                .content(req.getContent())
                .isPublic(req.getIsPublic())
                .author(curUser)
                .build();
        return toResponse(repo.save(n));
    }
    @Transactional
    public NoteResponse update(UUID id, NoteUpdateDto req, User curUser) {
        Note n = findNoteOrThrow(id);
        if (!canAccess(n, curUser))
            throw new NoteAccessDeniedException();

        n.setTitle(req.getTitle());
        n.setContent(req.getContent());
        n.setPublic(req.getIsPublic());
        return toResponse(repo.save(n));
    }
    @Transactional
    public void delete(UUID id, User curUser) {
        Note n = findNoteOrThrow(id);
        if (!isOwner(n, curUser))
            throw new NoteAccessDeniedException();

        repo.delete(n);
    }

    private Note findNoteOrThrow(UUID noteId) {
        return repo.findById(noteId)
                .orElseThrow(NoteNotFoundException::new);
    }

    private boolean isOwner(Note note, User user) {
        return note.getAuthor().getId().equals(user.getId());
    }

    private boolean canAccess(Note note, User user) {
        if (isOwner(note, user)) {
            return true;
        }
        if (note.isPublic()) {
            return true;
        }
        return accessRepo.existsByNoteIdAndUserId(note.getId(), user.getId());
    }
    private NoteResponse toResponse(Note n) {
        return NoteResponse.builder()
                .id(n.getId())
                .title(n.getTitle())
                .content(n.getContent())
                .authorId(n.getAuthor().getId())
                .createdAt(n.getCreatedAt())
                .updatedAt(n.getUpdatedAt())
                .isPublic(n.isPublic())
                .accesses(n.getAccesses().stream().map(a -> NoteAccessResponse.builder()
                        .id(a.getId())
                        .noteId(a.getNote().getId())
                        .userId(a.getUser().getId())
                        .grantedAt(a.getGrantedAt())
                        .build()).toList())
                .build();
    }
}
