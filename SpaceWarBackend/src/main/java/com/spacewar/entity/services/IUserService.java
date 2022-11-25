package com.spacewar.entity.services;

import com.spacewar.entity.models.Users;

import java.util.List;

public interface IUserService {
    public Users get(long PLID);

    public List<Users> getAll();

    public void post(Users user);

    public void put(Users user, long PLID);

    public void delete(long PLID);
}
