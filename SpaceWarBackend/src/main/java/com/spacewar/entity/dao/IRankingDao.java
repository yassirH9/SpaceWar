package com.spacewar.entity.dao;

import com.spacewar.entity.models.Ranking;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface IRankingDao extends CrudRepository<Ranking, Long> {

}
