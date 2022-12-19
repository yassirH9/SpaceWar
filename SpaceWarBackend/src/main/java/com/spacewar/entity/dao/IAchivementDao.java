package com.spacewar.entity.dao;

import com.spacewar.entity.models.Achivement;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface IAchivementDao extends CrudRepository<Achivement, Long> {

}
