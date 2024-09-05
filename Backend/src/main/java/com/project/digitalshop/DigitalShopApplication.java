package com.project.digitalshop;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(info = @Info(title = "My API Definition", description = "All API Definitions", version = "1.0.0", contact = @Contact(name = "DigitalShop", email = "digitalshop@example.com", url = "http://localhost:8080")), servers = @Server(url = "http://localhost:8080", description = "Development Server"), security = {
        @SecurityRequirement(name = "JWTAuth")
})

@SecurityScheme(name = "JWTAuth", description = "JWT Authentication", scheme = "bearer", type = SecuritySchemeType.HTTP, bearerFormat = "JWT", in = SecuritySchemeIn.HEADER)

// Use http://localhost:8080/swagger-ui/index.html for Swagger UI

@SpringBootApplication
public class DigitalShopApplication {
    public static void main(String[] args) {
        SpringApplication.run(DigitalShopApplication.class, args);
    }
}
