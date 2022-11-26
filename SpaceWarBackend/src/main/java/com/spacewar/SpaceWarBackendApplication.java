package com.spacewar;


import io.swagger.annotations.Authorization;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContext;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import springfox.documentation.spi.service.contexts.*;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@SpringBootApplication
@EnableSwagger2
public class SpaceWarBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpaceWarBackendApplication.class, args);
    }

    public static final String Auth_header = "Authorization";
//    private ApiKey apiKeys(){
//        return new ApiKey("JWT",Auth_header,"header");
//    }
//    private List<SecurityContext> securityContexts(){
//        return Arrays.asList(springfox.documentation.spi.service.contexts.SecurityContext.builder().securityReferences(sf()).build());
//    }
//    private List<SecurityReference> sf(){
//        AuthorizationScope scope = new AuthorizationScope("global","accessEverything");
//        return Arrays.asList(new SecurityReference("JWT",new AuthorizationScope[]{scope}));
//    }
private ApiKey apiKey() {
    return new ApiKey("JWT", "Authorization", "header");
}
    private SecurityContext securityContext() {
        return SecurityContext.builder().securityReferences(defaultAuth()).build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("JWT", authorizationScopes));
    }

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(apiKey()))
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();
    }
}
