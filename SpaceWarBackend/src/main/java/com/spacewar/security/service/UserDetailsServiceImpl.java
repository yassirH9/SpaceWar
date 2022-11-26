package com.spacewar.security.service;

import com.spacewar.entity.models.Users;
import com.spacewar.entity.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String nickname) throws UsernameNotFoundException {
        Users user = userRepository.findByNICKNAME(nickname)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + nickname));

        return UserDetailsImpl.build(user);
    }
}
