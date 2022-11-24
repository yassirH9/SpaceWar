package com.spacewar.controllers;

import com.spacewar.entity.models.MasterAchivement;
import com.spacewar.entity.services.impl.MasterAchivementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "*")
public class MasterAchivementController {
    @Autowired
    MasterAchivementService masterArchivementService;

    @GetMapping("/masterachive")
    public List<MasterAchivement> getAllMasterArchivement(){
        return masterArchivementService.getAll();
    }
    @GetMapping("/masterachive/{id}")
    public MasterAchivement getMasterArchivement(@PathVariable(value = "id") Long id){
        return masterArchivementService.get(id);
    }
    @PostMapping("/masterachive")
    public void postMasterArchivement(MasterAchivement masterArchivement){
        masterArchivementService.post(masterArchivement);
    }
    @PutMapping("/masterachive/{id}")
    public void putMasterArchivement(@PathVariable(value = "id") Long id,MasterAchivement masterArchivement){
        masterArchivementService.put(masterArchivement,id);
    }
    @DeleteMapping("/masterachive/{id}")
    public void deleteMasterArchivement(@PathVariable(value = "id") Long id){
        masterArchivementService.delete(id);
    }
}
