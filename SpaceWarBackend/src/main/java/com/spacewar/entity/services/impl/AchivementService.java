package com.spacewar.entity.services.impl;

import com.spacewar.entity.dao.IAchivementDao;
import com.spacewar.entity.models.Achivement;
import com.spacewar.entity.services.IAchivementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AchivementService implements IAchivementService {

    @Autowired
    private IAchivementDao archivementDao;

    @Override
    public Achivement get(long ID) {
        return archivementDao.findById(ID).get();
    }

    @Override
    public List<Achivement> getAll() {
        return (List<Achivement>) archivementDao.findAll();
    }

    @Override
    public void post(Achivement archivement) {
        archivementDao.save(archivement);
    }

    @Override
    public void put(Achivement archivement, long ID) {
        archivementDao.findById(ID).ifPresent((x) -> {
            archivement.setID(ID);
            archivementDao.save(archivement);
        });
    }

    @Override
    public void delete(long ID) {
        archivementDao.deleteById(ID);
    }
}
