package com.spacewar.entity.repository;

import com.spacewar.entity.models.Rol;
import com.spacewar.entity.models.ERol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RoleRepository extends JpaRepository<Rol,Long> {
    Optional<Rol> findByName(ERol name);
}
