package com.notesapp.backend.services;

import com.notesapp.backend.dtos.requests.create.LoginDto;
import com.notesapp.backend.dtos.requests.create.RegisterDto;
import com.notesapp.backend.dtos.responses.TokenResponse;
import com.notesapp.backend.models.api.User;
import com.notesapp.backend.repos.UserRepo;
import com.notesapp.backend.security.JwtService;
import com.notesapp.backend.utilities.exceptions.InvalidCredentialsException;
import com.notesapp.backend.utilities.exceptions.UsernameAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepo repo;
    private final PasswordEncoder encoder;
    private final JwtService service;

    @Transactional
    public TokenResponse register(RegisterDto req) {
        if (repo.existsByUsername(req.getUsername()))
            throw new UsernameAlreadyExistsException(req.getUsername());

        User u = User.builder()
                .username(req.getUsername())
                .passwordHash(encoder.encode(req.getPassword()))
                .avatarUrl(req.getAvatarUrl())
                .build();
        User saved = repo.save(u);

        String token = service.generateToken(saved.getId(), saved.getUsername());
        return new TokenResponse(token);
    }
    @Transactional(readOnly = true)
    public TokenResponse login(LoginDto req) {
        User u = repo.findByUsername(req.getUsername())
                .orElseThrow(InvalidCredentialsException::new);

        if (!encoder.matches(req.getPassword(), u.getPasswordHash()))
            throw new InvalidCredentialsException();

        String token = service.generateToken(u.getId(), u.getUsername());
        return new TokenResponse(token);
    }
}
