package com.spacewar.entity.models;

import javax.persistence.*;

@Entity
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERol name;

    public Rol() {

    }

    public Rol(ERol name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ERol getName() {
        return name;
    }

    public void setName(ERol name) {
        this.name = name;
    }
}
