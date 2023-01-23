package com.spacewar.entity.dao;

import com.spacewar.entity.models.Ranking;
import com.spacewar.entity.models.Users;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class IRankingDaoTest {

    @Autowired
    IRankingDao rankingDao;

    @Test
    void RankingGetTest() {
        /*
         * ~NOTAS~
         * requiere de un usuario registrado para realizar el registro de un nuevo ranking y
         * comprobar que funciona correctamente para elegir el plid de un usuario ya creado modificar variable plid
         *
         * Para forzar fallo del test comentar linea 60 que tras comprobar si el rankin esta en la base de datos
         * setea la variable testresult a true para passar el assertTrue
         *
         *
         *
         * Este test prueba que se pueda crear y buscar un objeto dentro de la base de datos
         * usando el dao de la clase ranking
         * */
        long plid = 1;
        boolean testresult = false;

        //creacion de un nuevo ranking
        Users usr = new Users();
        usr.setPLID(1);

        Ranking rk = new Ranking();
        rk.setPOINTS(500);
        rk.setUserplid(usr);

        try {
            //guardado del ranking en la base de datos usando el dao de ranking
            rankingDao.save(rk);
            //filtado para buscar el ranking guardado anteriormente en base al plid del usuario asociado
            List<Ranking> rkgs = (List<Ranking>) rankingDao.findAll();
            for (Ranking rki : rkgs) {
                //comprobacion para ver si el dato guardado anteriormente se encuentra en la base de datos
                if (rki.getUserplid().getPLID() == plid) {
                    assertNotNull(rankingDao.findById(rki.getID()), "El elemento se ha encontrado pero no se ha podido obtener por su id");
                    System.out.println("Ranking encontrado en base de datos:: " + rki.getUserplid().getNICKNAME() + ":" + rki.getPOINTS());
                    //eliminacion del ranking guardado anteriormente tras la comprobacion del test
                    rankingDao.deleteById(rki.getID());

                    //comprobacion atributos de objeto creado y objeto guardado son iguales
                    Assert.assertEquals("El id del objeto creado y el objeto guardado no coinciden", rk.getID(), rki.getID());
                    Assert.assertEquals("Los puntos del objeto creado y el objeto guardado no coinciden", rk.getPOINTS(), rki.getPOINTS());
                    Assert.assertEquals("El id de usuario del objeto creado y el objeto guardado no coinciden", rk.getUserplid().getPLID(), rki.getUserplid().getPLID());

                    testresult = true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        Assert.assertTrue("El elemento no se ha encontrado", testresult);
    }
}