package com.spacewar.imagecrud.repository;

import com.spacewar.imagecrud.entity.Image;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
public interface ImageRepository extends JpaRepository<Image,Long> {
    Optional<Image> findByName(String name);
    Optional<Image> findByPlid(long plid);
}
