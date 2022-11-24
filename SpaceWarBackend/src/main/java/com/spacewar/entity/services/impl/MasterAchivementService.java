package com.spacewar.entity.services.impl;

import com.spacewar.entity.dao.IMasterAchivementDao;
import com.spacewar.entity.models.MasterAchivement;
import com.spacewar.entity.services.IMasterAchivementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MasterAchivementService implements IMasterAchivementService {
    @Autowired
    private IMasterAchivementDao masterArchivementDao;
    @Override
    public MasterAchivement get(long ID) {
        return masterArchivementDao.findById(ID).get();
    }

    @Override
    public List<MasterAchivement> getAll() {
        return (List<MasterAchivement>) masterArchivementDao.findAll();
    }

    @Override
    public void post(MasterAchivement masterarchivement) {
        masterArchivementDao.save(masterarchivement);
    }

    @Override
    public void put(MasterAchivement masterarchivement, long ID) {
        masterArchivementDao.findById(ID).ifPresent((x)->{
            masterarchivement.setID(ID);
            masterArchivementDao.save(masterarchivement);
        });
    }

    @Override
    public void delete(long ID) {
        masterArchivementDao.deleteById(ID);
    }
}
