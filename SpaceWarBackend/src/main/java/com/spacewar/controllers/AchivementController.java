package com.spacewar.controllers;

import com.spacewar.entity.models.Achivement;
import com.spacewar.entity.services.impl.AchivementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/api")
public class AchivementController {
    @Autowired
    AchivementService archivementService;

    @GetMapping("/archivement")
    @PreAuthorize("hasRole('ROLE_USER') OR hasRole('ROLE_ADMIN') OR hasRole('ROLE_MODERATOR')")
    public List<Achivement> getAllArchivement() {
        return archivementService.getAll();
    }

    @GetMapping("/archivement/{id}")
    @PreAuthorize("hasRole('ROLE_USER') OR hasRole('ROLE_ADMIN') OR hasRole('ROLE_MODERATOR')")
    public Achivement getArchivement(@PathVariable(value = "id") Long id) {
        return archivementService.get(id);
    }

    @PostMapping("/archivement")
    @PreAuthorize("hasRole('ROLE_USER') OR hasRole('ROLE_ADMIN') OR hasRole('ROLE_MODERATOR')")
    public void postArchivement(Achivement archivement) {
        archivementService.post(archivement);
    }

    @PutMapping("/archivement/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_MODERATOR')")
    public void putArchivement(@PathVariable(value = "id") Long id, Achivement archivement) {
        archivementService.put(archivement, id);
    }

    @DeleteMapping("/archivement/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_MODERATOR')")
    public void deleteArchivement(@PathVariable(value = "id") Long id) {
        archivementService.delete(id);
    }
}
