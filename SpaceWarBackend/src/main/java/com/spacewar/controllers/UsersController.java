package com.spacewar.controllers;

import com.spacewar.entity.models.Users;
import com.spacewar.entity.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "*")
public class UsersController {
    @Autowired
    IUserService userService;

    @GetMapping("/user")
    public List<Users> getAllUsers() {
        return userService.getAll();
    }

    @GetMapping("/user/{plid}")
    public Users getUser(@PathVariable(value = "plid") Long PLID) {
        return userService.get(PLID);
    }

    @PostMapping("/user")
    public void postUser(Users user) {
        userService.post(user);
    }

    @PutMapping("/user/{PLID}")
    public void putUser(@PathVariable(value = "PLID") Long PLID, Users user) {
        userService.put(user, PLID);
    }

    @DeleteMapping("/user/{PLID}")
    public void deleteUser(@PathVariable(value = "PLID") Long PLID) {
        userService.delete(PLID);
    }
}
