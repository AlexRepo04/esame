package com.esame.backend.dto;

public class GenericResponse {
    private boolean success;
    private String message;

    public GenericResponse() {}

    public GenericResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public static GenericResponse ok(String message) {
        return new GenericResponse(true, message);
    }

    public static GenericResponse error(String message) {
        return new GenericResponse(false, message);
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}