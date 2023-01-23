package com.spacewar.controllers;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spacewar.entity.models.Ranking;
import com.spacewar.entity.models.Users;
import com.spacewar.entity.services.impl.RankingService;
import java.util.Arrays;
import java.util.List;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@RunWith(MockitoJUnitRunner.class)
public class RankingControllerTest {
    private MockMvc mockMvc;

    @Mock
    private RankingService rankingService;

    @InjectMocks
    private RankingController rankingController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(rankingController).build();
    }

    /*
    * Para probocar el fallo de este metodo comentar la linea "when(rankingService.getAll()).thenReturn(rankings);"
    * de esa forma los datos devueltos por la peticion y lo dados no coincidiran probocando un fallo en el .perfom
    * y por ende en el .verify y en el Assert.assertEquals
    * */
    @Test
    public void getAllRanking() throws Exception {
        //creacion de datos de muestra
        Users u1 = new Users();
        u1.setPLID(1);
        Users u2 = new Users();
        u2.setPLID(2);

        Ranking r1 = new Ranking();
        r1.setID(1);
        r1.setUserplid(u1);
        r1.setPOINTS(500);
        Ranking r2 = new Ranking();
        r2.setID(2);
        r2.setUserplid(u2);
        r2.setPOINTS(500);

        //creacion de un vector de muestra con los datos anteriores
        List<Ranking> rankings = Arrays.asList(r1,r2);

        //esta linea simula los datos que tendrian que ser devueltos por la base de datos
        when(rankingService.getAll()).thenReturn(rankings);

        //realiza una simulacion de la peticion y comprueba que lo sdatos sean correctos
        mockMvc.perform(get("/api/ranking"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(rankings)));

        verify(rankingService).getAll();

        //verificacion de que el vector creado y el devuelto son iguales
        List<Ranking> ranksNews = rankingService.getAll();
        Assert.assertEquals("Los objetos del vector de muestra no coinciden con los traidos por la peticion",rankings,ranksNews);
    }

    @Test
    public void getRanking() throws Exception {
        //creacion de datos de muestra
        Users u1 = new Users();
        u1.setPLID(1);
        Ranking r1 = new Ranking();
        r1.setID(1);
        r1.setUserplid(u1);
        r1.setPOINTS(500);

        //simulacion de retorno de datos
        when(rankingService.get(1)).thenReturn(r1);
        //simulacion de peticion
        mockMvc.perform(get("/api/ranking/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(r1)));

        verify(rankingService).get(1);
    }

    @Test
    public void getRankingByUser() throws Exception {
        //creacion de datos de muestra
        Users u1 = new Users();
        u1.setPLID(1);
        Ranking r1 = new Ranking();
        r1.setID(1);
        r1.setUserplid(u1);
        r1.setPOINTS(500);
        //crea un vector con los datos de muestra a retornar
        List<Ranking> rankings = Arrays.asList(r1);

        //simulacion de retorno de datos
        when(rankingService.getAll()).thenReturn(rankings);

        //simulacion de peticion
        mockMvc.perform(get("/api/ranking/plid/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(r1)));
        //comprueba si los datos retornados en el getall se encuentra el obtenido en la peticion
        verify(rankingService).getAll();
    }

    @Test
    public void postRanking() throws Exception {
        //se crea un objeto para realizar el post
        Ranking ranking = new Ranking();

        //Se realiza la similacion de la peticion
        rankingController.postRanking(ranking);
//      genera el fallo internal server error
//      mockMvc.perform(get("/api/ranking"))
//                .andExpect(status().isInternalServerError());


        //Se comprueba si se realizo la peticion
        verify(rankingService).post(ranking);
    }

    @Test
    public void putRanking() throws Exception {
        //datos necesarios para la peticion
        Long id = 1L;
        Ranking ranking = new Ranking();

        //simula la peticion
        rankingController.putRanking(id, ranking);

//      genera el fallo para un elemento que se quiere editar no se ha encontrado
//      mockMvc.perform(get("/api/ranking/1"))
//                .andExpect(status().isNotFound());

        // Assert
        verify(rankingService).put(ranking, id);
    }

    @Test
    public void deleteRanking() throws Exception {
        //datos necesarios para la peticion
        Long id = 1L;
        Ranking ranking = new Ranking();

        //simula la peticion
        rankingController.putRanking(id, ranking);

//      genera el fallo pidiendo autorizacion para realizar la siguiente peticion
//      mockMvc.perform(get("/api/ranking/1"))
//                .andExpect(status().isUnauthorized());
        // Assert
        verify(rankingService).put(ranking, id);
    }
}