package com.spacewar.entity.repository;

import com.spacewar.entity.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<Users,Long> {
    Optional<Users> findByNICKNAME(String NICKNAME);
    Boolean existsByNICKNAME(String NICKNAME);
    Boolean existsByMAIL(String MAIL);
}
