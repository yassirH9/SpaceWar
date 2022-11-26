package com.spacewar.security.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

public class SignupRequest {


//    @NotBlank
//    private Long PLID;

    @NotBlank
    @Size(min = 3,max = 20)
    private String nickname;

    @NotBlank
    @Size(max = 50)
    @Email
    private String mail;

    private Set<String> role;

    @NotBlank
    @Size(min = 6,max = 40)
    private String pswd;

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getMail() {
        return mail;
    }
//    public long getPLID(){return PLID;}
    public void setMail(String mail) {
        this.mail = mail;
    }

    public Set<String> getRol() {
        return role;
    }

    public void setRol(Set<String> role) {
        this.role = role;
    }

    public String getPswd() {
        return pswd;
    }

    public void setPswd(String pswd) {
        this.pswd = pswd;
    }
}
