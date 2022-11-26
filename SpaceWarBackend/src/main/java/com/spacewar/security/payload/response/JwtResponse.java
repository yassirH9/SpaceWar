package com.spacewar.security.payload.response;

import java.util.List;

public class JwtResponse {
    private String token;
    private String type= "Bearer";
    private Long plid;
    private String nickname;
    private String mail;
    private List<String> rol;

    public JwtResponse(String token, Long plid, String nickname, String mail, List<String> rol) {
        this.token = token;
        this.plid = plid;
        this.nickname = nickname;
        this.mail = mail;
        this.rol = rol;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public Long getPlid() {
        return plid;
    }

    public void setPlid(Long plid) {
        this.plid = plid;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public List<String> getRol() {
        return rol;
    }

    public void setRol(List<String> rol) {
        this.rol = rol;
    }
}
