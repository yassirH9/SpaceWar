package com.spacewar.entity.services;

import com.spacewar.entity.models.Ranking;

import java.util.List;

public interface IRankingService {
    public Ranking get(long ID);
    public List<Ranking> getAll();
    public void post(Ranking ranking);
    public void put(Ranking ranking,long ID);
    public void delete(long ID);
}
