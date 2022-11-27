package com.spacewar.controllers;

import com.spacewar.entity.models.ERole;
import com.spacewar.entity.models.Role;
import com.spacewar.entity.models.Users;
import com.spacewar.entity.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(value = "*")
public class UsersController {
    @Autowired
    IUserService userService;
    //para encriptar contraseñas del put
    @Autowired
    PasswordEncoder encoder;
    @GetMapping("/user")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Users> getAllUsers() {
        return userService.getAll();
    }

    @GetMapping("/user/{plid}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Users getUser(@PathVariable(value = "plid") Long PLID) {
        return userService.get(PLID);
    }

    @PostMapping("/user")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void postUser(Users user) {
        userService.post(user);
    }

    @PutMapping("/user/{PLID}")
    @PreAuthorize("hasRole('ROLE_USER') OR hasRole('ROLE_ADMIN') OR hasRole('ROLE_MODERATOR')")
    public void putUser(@PathVariable(value = "PLID") Long PLID, Users user) {
        //encriptado de la contraseña que se ha modificado
        String pswdEncrip = encoder.encode(user.getPSWD());
        user.setPSWD(pswdEncrip);
        userService.put(user, PLID);
    }

    @DeleteMapping("/user/{PLID}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteUser(@PathVariable(value = "PLID") Long PLID) {
        userService.delete(PLID);
    }
}
