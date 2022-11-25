package com.spacewar.imagecrud.repository;

import com.spacewar.imagecrud.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByName(String name);

    Optional<Image> findByPlid(long plid);
}
