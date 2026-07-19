package com.notesapp.backend.services;

import com.notesapp.backend.dtos.requests.update.UserUpdateDto;
import com.notesapp.backend.dtos.responses.NoteAccessResponse;
import com.notesapp.backend.dtos.responses.NoteResponse;
import com.notesapp.backend.dtos.responses.UserPublicResponse;
import com.notesapp.backend.dtos.responses.UserResponse;
import com.notesapp.backend.models.api.User;
import com.notesapp.backend.repos.UserRepo;
import com.notesapp.backend.utilities.exceptions.UserNotFoundException;
import com.notesapp.backend.utilities.exceptions.UsernameAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo repo;

    @Transactional(readOnly = true)
    public List<UserPublicResponse> get() {
        return repo.findAll().stream().map(this::toPublicResponse).toList();
    }
    @Transactional(readOnly = true)
    public UserPublicResponse getById(UUID id) {
        return toPublicResponse(repo.findById(id).orElseThrow(UserNotFoundException::new));
    }
    @Transactional(readOnly = true)
    public UserResponse getProfile(User curUser) {
        User u = repo.findById(curUser.getId())
                .orElseThrow(UserNotFoundException::new);

        return toResponse(u);
    }
    @Transactional
    public UserResponse update(UserUpdateDto req, User curUser) {
        User u = repo.findById(curUser.getId())
                .orElseThrow(UserNotFoundException::new);

        if (!req.getUsername().equals(u.getUsername())) {
            if (repo.existsByUsername(req.getUsername())) {
                throw new UsernameAlreadyExistsException(req.getUsername());
            }
            u.setUsername(req.getUsername());
        }
        u.setAvatarUrl(req.getAvatarUrl());

        return toResponse(repo.save(u));
    }

    private UserPublicResponse toPublicResponse(User u) {
        return UserPublicResponse.builder()
                .id(u.getId())
                .username(u.getUsername())
                .avatarUrl(u.getAvatarUrl())
                .build();
    }
    private UserResponse toResponse(User u) {
        return UserResponse.builder()
                .id(u.getId())
                .username(u.getUsername())
                .avatarUrl(u.getAvatarUrl())
                .createdAt(u.getCreatedAt())
                .notes(u.getNotes().stream().map(n -> NoteResponse.builder()
                        .id(n.getId())
                        .title(n.getTitle())
                        .content(n.getContent())
                        .isPublic(n.isPublic())
                        .authorId(n.getAuthor().getId())
                        .createdAt(n.getCreatedAt())
                        .updatedAt(n.getUpdatedAt())
                        .accesses(n.getAccesses().stream().map(a -> NoteAccessResponse.builder()
                                .id(a.getId())
                                .noteId(a.getNote().getId())
                                .userId(a.getUser().getId())
                                .username(a.getUser().getUsername())
                                .grantedAt(a.getGrantedAt())
                                .build()).toList())
                        .build()).toList())
                .build();
    }
}
