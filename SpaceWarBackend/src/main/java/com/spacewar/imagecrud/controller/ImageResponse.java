package com.spacewar.imagecrud.controller;

public class ImageResponse {
    private String message;

    public ImageResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
