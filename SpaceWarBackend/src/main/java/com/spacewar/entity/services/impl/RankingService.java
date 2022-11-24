package com.spacewar.entity.services.impl;

import com.spacewar.entity.dao.IRankingDao;
import com.spacewar.entity.models.Ranking;
import com.spacewar.entity.services.IRankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankingService implements IRankingService {
    @Autowired
    private IRankingDao rankingDao;
    @Override
    public Ranking get(long ID) {
        return rankingDao.findById(ID).get();
    }

    @Override
    public List<Ranking> getAll() {
        return (List<Ranking>) rankingDao.findAll();
    }

    @Override
    public void post(Ranking ranking) {
        rankingDao.save(ranking);
    }

    @Override
    public void put(Ranking ranking, long ID) {
        rankingDao.findById(ID).ifPresent((x)->{
            ranking.setID(ID);
            rankingDao.save(ranking);
        });
    }

    @Override
    public void delete(long ID) {
        rankingDao.deleteById(ID);
    }
}
