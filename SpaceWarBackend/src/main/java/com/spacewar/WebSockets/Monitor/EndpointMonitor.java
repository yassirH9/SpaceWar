package com.spacewar.WebSockets.Monitor;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.ExecutorService;

@Aspect
@Component
public class EndpointMonitor {
    public static boolean hasChanged = false;
    @Autowired
    private ExecutorService executorService;
    //se auditoria el endpoint de ranking para ver si han habido cambios que mandar
    //por websockets
    @Around("@annotation(MonitorEndpoint)")
    public Object monitorEndpoint(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        executorService.submit(() -> {
            System.out.println("Endpoint " + methodName + " was called.");
            hasChanged = true;
        });
        return joinPoint.proceed();
    }
}
