package com.spacewar.controllers;

import com.spacewar.entity.models.ERole;
import com.spacewar.entity.models.Role;
import com.spacewar.entity.models.Users;
import com.spacewar.entity.repository.RoleRepository;
import com.spacewar.entity.services.IUserService;
import com.spacewar.security.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.net.http.HttpClient;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/api")
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
    @PreAuthorize("hasRole('ROLE_USER') OR hasRole('ROLE_ADMIN')")
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
        //la contraseña ya viene con bcript desde el put frontend
//        String pswdEncrip = encoder.encode(user.getPSWD());
//        user.setPSWD(pswdEncrip);

        //--------------------------------------------
        Users currentUser = userService.get(PLID);
        currentUser.setPSWD(encoder.encode(user.getPSWD()));
        currentUser.setMAIL(user.getMAIL());
        currentUser.setNICKNAME(user.getNICKNAME());
        userService.put(currentUser,PLID);
    }

    @DeleteMapping("/user/{PLID}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteUser(@PathVariable(value = "PLID") Long PLID) {
        userService.delete(PLID);
    }
}
