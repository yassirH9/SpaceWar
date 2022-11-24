package com.spacewar.entity.services;

import com.spacewar.entity.models.MasterAchivement;

import java.util.List;

public interface IMasterAchivementService {
    public MasterAchivement get(long ID);
    public List<MasterAchivement> getAll();
    public void post(MasterAchivement masterarchivement);
    public void put(MasterAchivement masterarchivement,long ID);
    public void delete(long ID);
}
