package com.spacewar.entity.dao;

import com.spacewar.entity.models.Users;
import org.springframework.data.repository.CrudRepository;

public interface IUserDao extends CrudRepository<Users,Long> {
}
