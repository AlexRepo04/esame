package com.esame.backend.service;

import com.esame.backend.dto.AuthResponse;
import com.esame.backend.dto.LoginRequest;
import com.esame.backend.dto.RegisterRequest;
import com.esame.backend.model.User;
import com.esame.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username già esistente");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email già registrata");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        userRepository.save(user);

        // Non generiamo più il token, restituiamo solo un messaggio di successo
        return new AuthResponse(null, user.getUsername(), user.getEmail(), "Registrazione completata!");
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Credenziali non valide"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Credenziali non valide");
        }

        // Non generiamo più il token
        return new AuthResponse(null, user.getUsername(), user.getEmail(), "Login effettuato!");
    }
}