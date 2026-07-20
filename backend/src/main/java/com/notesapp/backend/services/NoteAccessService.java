package com.notesapp.backend.services;

import com.notesapp.backend.dtos.responses.NoteAccessResponse;
import com.notesapp.backend.models.api.Note;
import com.notesapp.backend.models.api.NoteAccess;
import com.notesapp.backend.models.api.User;
import com.notesapp.backend.repos.NoteAccessRepo;
import com.notesapp.backend.repos.NoteRepo;
import com.notesapp.backend.repos.UserRepo;
import com.notesapp.backend.utilities.exceptions.NoteAccessAlreadyGrantedException;
import com.notesapp.backend.utilities.exceptions.NoteAccessDeniedException;
import com.notesapp.backend.utilities.exceptions.NoteNotFoundException;
import com.notesapp.backend.utilities.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NoteAccessService {
    private final NoteRepo repo;
    private final NoteAccessRepo accessRepo;
    private final UserRepo userRepo;

    @Transactional(readOnly = true)
    public List<NoteAccessResponse> getForNote(UUID noteId, User curUser) {
        Note n = findNoteOrThrow(noteId);
        requireOwner(n, curUser);

        return n.getAccesses().stream().map(this::toResponse).toList();
    }
    @Transactional
    public NoteAccessResponse grant(UUID noteId, UUID userId, User curUser) {
        Note n = findNoteOrThrow(noteId);
        requireOwner(n, curUser);

        if (accessRepo.existsByNoteIdAndUserId(noteId, userId))
            throw new NoteAccessAlreadyGrantedException();

        User target = userRepo.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        NoteAccess access = NoteAccess.builder()
                .note(n)
                .user(target)
                .grantedAt(LocalDateTime.now())
                .build();
        return toResponse(accessRepo.save(access));
    }
    @Transactional
    public void revoke(UUID noteId, UUID userId, User curUser) {
        Note n = findNoteOrThrow(noteId);
        requireOwner(n, curUser);

        NoteAccess a = accessRepo.findByNoteIdAndUserId(noteId, userId)
                .orElseThrow(NoteNotFoundException::new);
        accessRepo.delete(a);
    }

    private Note findNoteOrThrow(UUID noteId) {
        return repo.findById(noteId)
                .orElseThrow(NoteNotFoundException::new);
    }

    private void requireOwner(Note note, User user) {
        if (!note.getAuthor().getId().equals(user.getId())) {
            throw new NoteAccessDeniedException();
        }
    }

    private NoteAccessResponse toResponse(NoteAccess a) {
        return NoteAccessResponse.builder()
                .id(a.getId())
                .noteId(a.getNote().getId())
                .userId(a.getUser().getId())
                .username(a.getUser().getUsername())
                .grantedAt(a.getGrantedAt())
                .build();
    }
}
