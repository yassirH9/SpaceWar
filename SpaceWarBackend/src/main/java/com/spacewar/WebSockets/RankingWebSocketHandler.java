package com.spacewar.WebSockets;

import com.google.gson.Gson;
import com.spacewar.WebSockets.Monitor.EndpointMonitor;
import com.spacewar.WebSockets.Payloads.SimpleRanking;
import com.spacewar.entity.dao.IRankingDao;
import com.spacewar.entity.models.Ranking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

//logs
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//json


@Component
@Scope("prototype")
public class RankingWebSocketHandler implements WebSocketHandler {
    //servicio para obtener los datos del ORM
    @Autowired
    private IRankingDao rankingDao;
    //log service
    private static final Logger logger = LoggerFactory.getLogger(RankingWebSocketHandler.class);

    //Alacenamiento de sesiones creadas
    private final List<WebSocketSession> sessionList = new CopyOnWriteArrayList<>();


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        // Este método se ejecuta cuando se establece la conexión WebSocket.
        // Aquí puedes inicializar la sesión y suscribirte a los eventos de la base de datos.

        //se almacena la conexion creada por websockets
        sessionList.add(session);
        //envia al usuario recien conectado una lista recien tomada de la base de datos
        session.sendMessage(new TextMessage(toJson(innerConverter())));

        //muestra en log el usuario conectado
        logger.info("Nuevo usuario conextado: "+session.getLocalAddress());
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) {
        // Este método se ejecuta cuando se recibe un mensaje desde el cliente WebSocket.
        // Aquí puedes procesar los mensajes y enviar actualizaciones a los clientes suscritos.
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        // Este método se ejecuta cuando se produce un error en la conexión WebSocket.
        // Aquí puedes manejar el error y cerrar la sesión WebSocket si es necesario.
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) {
        // Este método se ejecuta cuando se cierra la conexión WebSocket.
        // Aquí puedes limpiar recursos y cancelar la suscripción a los eventos de la base de datos.

        //se elimina la sesion de la lista de subcritos cuando se cierra la sesion con el websocket
        sessionList.remove(session);
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    //metodo para convertir de Ranking a SimpleRanking
    //esto es necesario ya que gson no es capaz de iterar sobre el modelo complejo de Ranking
    public List<SimpleRanking> innerConverter(){
        //rankigs tomados de la base de datos
        List<Ranking> rankingsFromDB = (List<Ranking>) rankingDao.findAll();
        //rankings convertidos al modelo simple adaptado para ws
        List<SimpleRanking> simpleRankings = new ArrayList<>();

        //conversor de Ranking a SimpleRanking
        for(Ranking r: rankingsFromDB){
            simpleRankings.add(new SimpleRanking(r.getID(),r.getPOINTS(),r.getUserplid().getNICKNAME()));
        }
        return simpleRankings;
    }

    //convierte lista a json
    public String toJson(List<SimpleRanking> simpleRankingList){
        Gson gson = new Gson();
        return gson.toJson(simpleRankingList);
    }


    private ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
    //Ejecuta la comprobacion de cambios cada 5 segundos
    public RankingWebSocketHandler() {
        scheduler.scheduleAtFixedRate(this::verificarCambios, 0, 5, TimeUnit.SECONDS);
    }
    //desde el EndpointMonitor se comprueba si su  variable interna esta en true que indica
    //que han habido cambios y se necesita actualizar los clientes websocket
    public void verificarCambios() {
        if(EndpointMonitor.hasChanged){
            sessionList.forEach((session)->{
                try {
                    session.sendMessage(new TextMessage(toJson(innerConverter())));
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
            EndpointMonitor.hasChanged = false;
        }
    }
}
