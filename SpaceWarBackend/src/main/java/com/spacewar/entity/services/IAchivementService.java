package com.spacewar.entity.services;

import com.spacewar.entity.models.Achivement;

import java.util.List;

public interface IAchivementService {
    public Achivement get(long ID);
    public List<Achivement> getAll();
    public void post(Achivement archivement);
    public void put(Achivement archivement,long ID);
    public void delete(long ID);
}
