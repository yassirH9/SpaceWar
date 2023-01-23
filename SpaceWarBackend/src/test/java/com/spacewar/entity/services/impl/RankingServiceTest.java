package com.spacewar.entity.services.impl;

import com.spacewar.entity.models.Ranking;
import com.spacewar.entity.models.Users;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
class RankingServiceTest {
    @Autowired
    RankingService rankingService;

    @Test
    void get() {
        //obtiene todos los datos de la base de datos para comparar los datos obtenidos por el metodo getall y el metodo get
        //respectivamente los metodos del dao findall y findbyid
        List<Ranking> ranks = rankingService.getAll();

        if (ranks.size() == 0) {
            //crear un ranking para añadir temporalmente en caso de que no hayan rankins guardados previamente
            Users usr = new Users();
            usr.setPLID(1);

            Ranking rk = new Ranking();
            rk.setPOINTS(500);
            rk.setUserplid(usr);
            rankingService.post(rk);

            rankingService.getAll().forEach((x) -> {
                if (x.getUserplid().getPLID() == 1) {
                    assertEquals("Los id de los objetos comparados no son iguales", x.getID(), rk.getID());
                    assertEquals("Los puntos de los objetos comparados no son iguales", x.getPOINTS(), rk.getPOINTS());
                    assertEquals("El usuario asociado al ranking no es el mismo", x.getUserplid().getPLID(), rk.getUserplid().getPLID());


                    //elimina el rk creado al inicio
                    rankingService.delete(x.getID());
                } else {
                    Assert.assertNotNull("No se encontro un objeto con ese id", null);
                }
            });

        } else {
            //se obtiene el primero para hacer la comparacion de los datos guardados
            Ranking rankingobj = rankingService.get(ranks.get(0).getID());
            assertEquals("Los id de los objetos comparados no son iguales", rankingobj.getID(), ranks.get(0).getID());
            assertEquals("Los puntos de los objetos comparados no son iguales", rankingobj.getPOINTS(), ranks.get(0).getPOINTS());
            assertEquals("El usuario asociado al ranking no es el mismo", rankingobj.getUserplid().getPLID(), ranks.get(0).getUserplid().getPLID());
        }
    }

    @Test
    void getAll() {

    }

    @Test
    void post() {
    }

    @Test
    void put() {
    }

    @Test
    void delete() {
    }
}