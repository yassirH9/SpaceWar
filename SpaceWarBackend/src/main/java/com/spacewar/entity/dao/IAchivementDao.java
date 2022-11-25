package com.spacewar.entity.dao;

import com.spacewar.entity.models.Achivement;
import org.springframework.data.repository.CrudRepository;

public interface IAchivementDao extends CrudRepository<Achivement, Long> {
}
