package com.spacewar.entity.dao;

import com.spacewar.entity.models.Ranking;
import org.springframework.data.repository.CrudRepository;

public interface IRankingDao extends CrudRepository<Ranking,Long> {
}
