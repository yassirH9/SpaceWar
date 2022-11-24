package com.spacewar.entity.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Users implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long PLID;
    @NotBlank
    @Size(max = 40)
    String MAIL;
    @NotBlank
    @Size(max = 50)
    String PSWD;
    @NotBlank
    @Size(max = 35)
    String NICKNAME;

    //relacion con ranking
    @OneToOne(mappedBy = "userplid")
    @JsonIgnore
    private Ranking rank;
    //relacion con archivement
//    @ManyToOne
//    @JoinColumn(name = "usersSet",nullable = false)
//    private Archivement archivement;
    @OneToMany(mappedBy = "userm")
    @JsonIgnore
    private Set<Achivement> achivements;

    //Roles de usuario
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Rol> roles = new HashSet<>();

    public Users(long PLID, String MAIL, String PSWD, String NICKNAME) {
        this.PLID = PLID;
        this.MAIL = MAIL;
        this.PSWD = PSWD;
        this.NICKNAME = NICKNAME;
    }

    public Users(){}

    public long getPLID() {
        return PLID;
    }

    public String getMAIL() {
        return MAIL;
    }

    public String getPSWD() {
        return PSWD;
    }

    public String getNICKNAME() {
        return NICKNAME;
    }

    public Ranking getRank() {
        return rank;
    }

    public Set<Achivement> getAchivements() {
        return achivements;
    }

    public Set<Rol> getRoles() {
        return roles;
    }

    public void setPLID(long PLID) {
        this.PLID = PLID;
    }

    public void setMAIL(String MAIL) {
        this.MAIL = MAIL;
    }

    public void setPSWD(String PSWD) {
        this.PSWD = PSWD;
    }

    public void setNICKNAME(String NICKNAME) {
        this.NICKNAME = NICKNAME;
    }

    public void setRank(Ranking rank) {
        this.rank = rank;
    }

    public void setAchivements(Set<Achivement> achivements) {
        this.achivements = achivements;
    }

    public void setRoles(Set<Rol> roles) {
        this.roles = roles;
    }
}
