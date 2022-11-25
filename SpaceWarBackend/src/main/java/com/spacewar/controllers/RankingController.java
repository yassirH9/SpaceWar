package com.spacewar.controllers;

import com.spacewar.entity.models.Ranking;
import com.spacewar.entity.services.impl.RankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "*")
public class RankingController {

    @Autowired
    private RankingService rankingService;

    @GetMapping("/ranking")
    public List<Ranking> getAllRanking() {
        return rankingService.getAll();
    }

    @GetMapping("/ranking/{id}")
    public Ranking getRanking(@PathVariable(value = "id") Long id) {
        return rankingService.get(id);
    }

    @PostMapping("/ranking")
    public void postRanking(Ranking ranking) {
        rankingService.post(ranking);
    }

    @PutMapping("/ranking/{id}")
    public void putRanking(@PathVariable(value = "id") Long id, Ranking ranking) {
        rankingService.put(ranking, id);
    }

    @DeleteMapping("/ranking/{id}")
    public void deleteRanking(@PathVariable(value = "id") Long id) {
        rankingService.delete(id);
    }
}
