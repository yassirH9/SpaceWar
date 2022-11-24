package com.spacewar.entity.models;

import javax.persistence.*;
import java.io.Serializable;
@Entity
public class Ranking implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ID;

    //@NotBlank
    private int POINTS;
    //relacion con usuario
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "FK_PLID", referencedColumnName = "PLID")
    private Users userplid;

    public Ranking(long ID, int POINTS, Users userplid) {
        this.ID = ID;
        this.POINTS = POINTS;
        this.userplid = userplid;
    }

    public Ranking(){}

    public long getID() {
        return ID;
    }

    public int getPOINTS() {
        return POINTS;
    }

    public Users getUserplid() {
        return userplid;
    }

    public void setID(long ID) {
        this.ID = ID;
    }

    public void setPOINTS(int POINTS) {
        this.POINTS = POINTS;
    }

    public void setUserplid(Users userplid) {
        this.userplid = userplid;
    }
}
