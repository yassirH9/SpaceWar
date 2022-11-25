package com.spacewar.entity.services.impl;

import com.spacewar.entity.dao.IUserDao;
import com.spacewar.entity.models.Users;
import com.spacewar.entity.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserDao userDao;

    @Override
    public Users get(long PLID) {
        return userDao.findById(PLID).get();
    }

    @Override
    public List<Users> getAll() {
        return (List<Users>) userDao.findAll();
    }

    @Override
    public void post(Users user) {
        userDao.save(user);
    }

    @Override
    public void put(Users user, long PLID) {
        userDao.findById(PLID).ifPresent((x) -> {
            user.setPLID(PLID);
            userDao.save(user);
        });
    }

    @Override
    public void delete(long PLID) {
        userDao.deleteById(PLID);
    }
}
