package com.esame.backend.service;

import com.esame.backend.dto.SpaceRequest;
import com.esame.backend.model.Space;
import com.esame.backend.repository.SpaceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class SpaceService {

    private final SpaceRepository spaceRepository;

    public SpaceService(SpaceRepository spaceRepository) {
        this.spaceRepository = spaceRepository;
    }

    public Space saveSpace(SpaceRequest request) {
        Space space = new Space();
        space.setTitle(request.getTitle());
        space.setCitta(request.getCitta());
        space.setDescription(request.getDescription());
        space.setServizi(request.getServizi());
        space.setImageUrl(request.getImageUrl());
        return spaceRepository.save(space);
    }

    public List<Space> getAllSpace() {
        return spaceRepository.findAll();
    }

    public void deleteSpace(Long id) {
        if (!spaceRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Spazio non trovato");
        }

        spaceRepository.deleteById(id);
    }
}
