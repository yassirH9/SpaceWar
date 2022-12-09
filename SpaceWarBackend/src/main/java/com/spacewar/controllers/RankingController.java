package com.spacewar.controllers;

import com.spacewar.entity.models.Ranking;
import com.spacewar.entity.services.impl.RankingService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(tags = "rankings")
@CrossOrigin(value = "*")
//TEST cambio en endpoint para evitar CORSq
@RequestMapping("/api")
public class RankingController {

    @Autowired
    private RankingService rankingService;
    //@PreAuthorize("hasRole('ROLE_USER') OR hasRole('ROLE_ADMIN') OR hasRole('ROLE_MODERATOR')")
    @GetMapping("/ranking")
    public List<Ranking> getAllRanking() {
        return rankingService.getAll();
    }

    @GetMapping("/ranking/{id}")
    @PreAuthorize("hasRole('ROLE_USER') OR hasRole('ROLE_ADMIN') OR hasRole('ROLE_MODERATOR')")
    public Ranking getRanking(@PathVariable(value = "id") Long id) {
        return rankingService.get(id);
    }

    @PostMapping("/ranking")
    @PreAuthorize("hasRole('ROLE_USER') OR hasRole('ROLE_ADMIN') OR hasRole('ROLE_MODERATOR')")
    public void postRanking(Ranking ranking) {
        rankingService.post(ranking);
    }

    @PutMapping("/ranking/{id}")
    @PreAuthorize("hasRole('ROLE_USER') OR hasRole('ROLE_ADMIN') OR hasRole('ROLE_MODERATOR')")
    public void putRanking(@PathVariable(value = "id") Long id, Ranking ranking) {
        rankingService.put(ranking, id);
    }

    @DeleteMapping("/ranking/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_MODERATOR')")
    public void deleteRanking(@PathVariable(value = "id") Long id) {
        rankingService.delete(id);
    }
}
