package com.spacewar.imagecrud.controller;


import com.spacewar.imagecrud.entity.Image;
import com.spacewar.imagecrud.repository.ImageRepository;
import com.spacewar.imagecrud.util.ImageUtility;
import com.sun.jdi.event.ExceptionEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RestController
//@CrossOrigin(origins = "http://localhost:8082") open for specific port
@CrossOrigin() // open for all ports
public class ImageController {
    @Autowired
    ImageRepository imageRepository;

    @PostMapping("/upload/image")
    public ResponseEntity<ImageResponse> uplaodImage(@RequestParam("image") MultipartFile file,@RequestParam("user") long plid)
            throws IOException {
        //conversion de nombre original a id unico
        String randomID= UUID.randomUUID().toString();
        String filename = randomID.concat(randomID+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")));

        imageRepository.save(Image.builder()
                .name(filename)
                .type(file.getContentType())
                .image(ImageUtility.compressImage(file.getBytes()))
                .plid(plid).build());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ImageResponse("Image uploaded successfully: " +
                        file.getOriginalFilename()));
    }

    @GetMapping(path = {"/get/image/info/{name}"})
    public Image getImageDetails(@PathVariable("name") String name) throws IOException {

        final Optional<Image> dbImage = imageRepository.findByName(name);

        return Image.builder()
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .image(ImageUtility.decompressImage(dbImage.get().getImage()))
                .plid(dbImage.get().getPlid()).build();
    }

    @GetMapping(path = {"/get/image/{name}"})
    public ResponseEntity<byte[]> getImage(@PathVariable("name") String name) throws IOException {

        final Optional<Image> dbImage = imageRepository.findByName(name);

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
    }
    @GetMapping(path = {"/get/image/user/{plid}"})
    public ResponseEntity<byte[]> getImageByPLID(@PathVariable("plid") long PLID) throws IOException {

        final Optional<Image> dbImage = imageRepository.findByPlid(PLID);

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
    }

    @PutMapping("/put/image/")
    public ResponseEntity<ImageResponse> putImage(@RequestParam("image") MultipartFile file,@RequestParam("user") long plid)
            throws IOException{

        //conversion de nombre original a id unico
        String randomID= UUID.randomUUID().toString();
        String filename = randomID.concat(randomID+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")));

        //buscar elemento y sobrescribir en db
        byte[] image;
        image = file.getBytes();
        long imagedbid = imageRepository.findByPlid(plid).get().getId();
        imageRepository.findByPlid(plid).ifPresent((x)->{
            imageRepository.save(
                    Image.builder()
                            .id(imagedbid)
                            .name(filename)
                            .type(file.getContentType())
                            .image(ImageUtility.compressImage(image))
                            .plid(plid).build());
        });
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ImageResponse("Image uploaded successfully: " +
                        file.getOriginalFilename()));
    }

    @DeleteMapping("/del/image/{plid}")
    public ResponseEntity<ImageResponse> deleteImage(@PathVariable(value = "plid") long plid){
//        imageRepository.findByPlid(plid).ifPresent((x)->{
//            imageRepository.deleteByPlid(plid);
//        });
        //manejo de errores
        try{
            imageRepository.findByPlid(plid).ifPresent((x)->{
                long id = x.getId();
                imageRepository.deleteById(id);
            });
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ImageResponse("Image deleted successfully"));
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ImageResponse("Image was not deleted"));
        }
    }
}
