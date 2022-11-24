package com.spacewar.controllers;

import com.spacewar.entity.models.Achivement;
import com.spacewar.entity.services.impl.AchivementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "*")
public class AchivementController {
    @Autowired
    AchivementService archivementService;

    @GetMapping("/archivement")
    public List<Achivement> getAllArchivement(){
        return archivementService.getAll();
    }
    @GetMapping("/archivement/{id}")
    public Achivement getArchivement(@PathVariable(value = "id") Long id){
        return archivementService.get(id);
    }
    @PostMapping("/archivement")
    public void postArchivement(Achivement archivement){
        archivementService.post(archivement);
    }
    @PutMapping("/archivement/{id}")
    public void putArchivement(@PathVariable(value = "id") Long id, Achivement archivement){
        archivementService.put(archivement,id);
    }
    @DeleteMapping("/archivement/{id}")
    public void deleteArchivement(@PathVariable(value = "id") Long id){
        archivementService.delete(id);
    }
}
