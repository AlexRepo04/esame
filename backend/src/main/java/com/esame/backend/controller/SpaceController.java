package com.esame.backend.controller;

import com.esame.backend.dto.GenericResponse;
import com.esame.backend.dto.SpaceRequest;
import com.esame.backend.model.Space;
import com.esame.backend.service.SpaceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/spaces")
public class SpaceController {

    private final SpaceService spaceService;

    public SpaceController(SpaceService spaceService) {
        this.spaceService = spaceService;
    }

    @PostMapping
    public ResponseEntity<GenericResponse> createSpace(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @Valid @RequestBody SpaceRequest request) {
        requireAuthenticated(authorization);
        spaceService.saveSpace(request);
        return ResponseEntity.ok(GenericResponse.ok("Spazio creato con successo!"));
    }

    @GetMapping
    public ResponseEntity<List<Space>> getAllSpace() {
        return ResponseEntity.ok(spaceService.getAllSpace());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<GenericResponse> deleteSpace(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id) {
        requireAuthenticated(authorization);
        spaceService.deleteSpace(id);
        return ResponseEntity.ok(GenericResponse.ok("Spazio eliminato con successo!"));
    }

    private void requireAuthenticated(String authorization) {
        if (authorization == null || authorization.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Devi effettuare il login");
        }
    }
}
