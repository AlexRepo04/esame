package com.esame.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ContactRequest {

    @NotBlank(message = "Nome obbligatorio")
    private String name;

    @NotBlank(message = "Email obbligatoria")
    @Email(message = "Email non valida")
    private String email;

    private String citta;
    private String spazioSelezionato;
    private String nPersone;

    @NotBlank(message = "Messaggio obbligatorio")
    private String descrizioneAttivita;

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
}