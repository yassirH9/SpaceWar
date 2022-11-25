package com.spacewar.entity.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Achivement implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ID;

    //    @NotBlank
//    @OneToMany(mappedBy = "archivement")
//    private Set<Users> usersSet;
    //@NotBlank
    @ManyToOne
    @JoinColumn(name = "userplid", nullable = false)
    private Users userm;

//    @NotBlank
//    @OneToMany(mappedBy = "archivementMast")
//    private Set<MasterArchivement> masterArchivements;
    //@NotBlank

//    @ManyToOne
//    @JsonManagedReference("masterArchivement")
//    @JoinColumn(name = "archivemasterid",nullable = false)
//    private MasterArchivement masterArchivement;

    @ManyToOne
    @JsonManagedReference("masterArchivement")
    private MasterAchivement masterAchivement;

    public Achivement(long ID, Users userm, MasterAchivement masterAchivement) {
        this.ID = ID;
        this.userm = userm;
        this.masterAchivement = masterAchivement;
    }

    public Achivement() {
    }

    public long getID() {
        return ID;
    }

    public Users getUserm() {
        return userm;
    }

    public MasterAchivement getMasterAchivement() {
        return masterAchivement;
    }

    public void setID(long ID) {
        this.ID = ID;
    }

    public void setUserm(Users userm) {
        this.userm = userm;
    }

    public void setMasterAchivement(MasterAchivement masterAchivement) {
        this.masterAchivement = masterAchivement;
    }
}
