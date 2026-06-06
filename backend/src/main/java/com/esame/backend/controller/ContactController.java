package com.esame.backend.controller;

import com.esame.backend.dto.ContactRequest;
import com.esame.backend.dto.GenericResponse;
import com.esame.backend.model.Contact;
import com.esame.backend.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    // POST pubblico - chiunque può inviare un messaggio
    @PostMapping
    public ResponseEntity<GenericResponse> submitContact(@Valid @RequestBody ContactRequest request) {
        contactService.saveContact(request);
        return ResponseEntity.ok(GenericResponse.ok("Messaggio inviato con successo!"));
    }

    // GET protetto - solo utenti autenticati vedono i messaggi
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }
}