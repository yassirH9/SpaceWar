package com.spacewar.entity.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
public class MasterAchivement implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ID;

    private String NAME;
    private String DESCRIPTION;

//    @ManyToOne
//    @JoinColumn(name="archivementM_id", nullable=false)
//    private Archivement archivementMast;

    //@JsonIgnore
    //@ManyToMany(mappedBy = "masterArchivement")

//    @OneToMany(mappedBy = "masterArchivement")
//    @JsonBackReference("mas terArchivement")
//    private Set<Archivement> archivementM;

    @OneToMany(mappedBy = "masterAchivement")
    @JsonIgnore
    private List<Achivement> archivementList;

    public MasterAchivement(long ID, String NAME, String DESCRIPTION) {
        this.ID = ID;
        this.NAME = NAME;
        this.DESCRIPTION = DESCRIPTION;
    }

    public MasterAchivement(){}

    public long getID() {
        return ID;
    }

    public String getNAME() {
        return NAME;
    }

    public String getDESCRIPTION() {
        return DESCRIPTION;
    }

    public List<Achivement> getArchivementList() {
        return archivementList;
    }

    public void setID(long ID) {
        this.ID = ID;
    }

    public void setNAME(String NAME) {
        this.NAME = NAME;
    }

    public void setDESCRIPTION(String DESCRIPTION) {
        this.DESCRIPTION = DESCRIPTION;
    }

    public void setArchivementList(List<Achivement> archivementList) {
        this.archivementList = archivementList;
    }
}
