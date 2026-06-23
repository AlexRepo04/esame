package com.esame.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contacts")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String citta;

    @Column(nullable = false)
    private String spazioSelezionato;

    @Column(nullable = true)
    private String nPersone;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String descrizioneAttivita;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Contact() {
    }

    public Contact(String name, String email, String citta, String spazioSelezionato, String nPersone,
            String descrizioneAttivita) {
        this.name = name;
        this.email = email;
        this.citta = citta;
        this.spazioSelezionato = spazioSelezionato;
        this.nPersone = nPersone;
        this.descrizioneAttivita = descrizioneAttivita;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCitta() {
        return citta;
    }

    public void setCitta(String citta) {
        this.citta = citta;
    }

    public String getSpazioSelezionato() {
        return spazioSelezionato;
    }

    public void setSpazioSelezionato(String spazioSelezionato) {
        this.spazioSelezionato = spazioSelezionato;
    }

    public String getNPersone() {
        return nPersone;
    }

    public void setNPersone(String nPersone) {
        this.nPersone = nPersone;
    }

    public String getDescrizioneAttivita() {
        return descrizioneAttivita;
    }

    public void setDescrizioneAttivita(String descrizioneAttivita) {
        this.descrizioneAttivita = descrizioneAttivita;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}