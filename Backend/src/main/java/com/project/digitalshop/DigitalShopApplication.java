package com.project.digitalshop;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

import java.util.List;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import com.project.digitalshop.services.implementation.EmailService;

@OpenAPIDefinition(info = @Info(title = "My API Definition", description = "All API Definitions", version = "1.0.0", contact = @Contact(name = "DigitalShop", email = "digitalshop@example.com", url = "http://localhost:8080")), servers = @Server(url = "http://localhost:8080", description = "Development Server"), security = {
        @SecurityRequirement(name = "JWTAuth")
})

@SecurityScheme(name = "JWTAuth", description = "JWT Authentication", scheme = "bearer", type = SecuritySchemeType.HTTP, bearerFormat = "JWT", in = SecuritySchemeIn.HEADER)

// Use http://localhost:8080/swagger-ui/index.html for Swagger UI

@SpringBootApplication
public class DigitalShopApplication {

    private final EmailService emailService;

    public DigitalShopApplication(EmailService emailService) {
        this.emailService = emailService;
    }

    public static void main(String[] args) {
        SpringApplication.run(DigitalShopApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void sendMail() {
        // Create a map with invoice details
        Map<String, Object> variables = new HashMap<>();

        // Invoice details
        variables.put("id", "INV12345");
        variables.put("logo", "https://res.cloudinary.com/ddccmeegw/image/upload/v1725480360/oi3a1umlkrxpvxk0e98e.png");

        // User details
        Map<String, String> user = new HashMap<>();
        user.put("firstName", "John");
        user.put("lastName", "Doe");
        user.put("email", "john.doe@example.com");
        user.put("phoneNumber", "+1234567890");
        variables.put("user", user);

        // Invoice details
        LocalDateTime now = LocalDateTime.now();
        variables.put("createdOn", now);
        variables.put("paymentMethod", "Credit Card");
        variables.put("paymentStatus", "Paid");
        variables.put("subTotal", new BigDecimal("5000.00")); // Using BigDecimal
        variables.put("tax", new BigDecimal("500.00")); // Using BigDecimal
        variables.put("totalPrice", new BigDecimal("5500.00")); // Using BigDecimal

        // Products
        List<Map<String, Object>> products = new ArrayList<>();

        Map<String, Object> product1 = new HashMap<>();
        product1.put("id", "prod001");
        product1.put("name", "Product 1");
        product1.put("price", new BigDecimal("2000.00")); // Using BigDecimal
        products.add(product1);

        Map<String, Object> product2 = new HashMap<>();
        product2.put("id", "prod002");
        product2.put("name", "Product 2");
        product2.put("price", new BigDecimal("1500.00")); // Using BigDecimal
        products.add(product2);

        Map<String, Object> product3 = new HashMap<>();
        product3.put("id", "prod003");
        product3.put("name", "Product 3");
        product3.put("price", new BigDecimal("1500.00")); // Using BigDecimal
        products.add(product3);

        variables.put("products", products);

        Map<String, Object> invoice = new HashMap<>();
        invoice.put("invoice", variables);

        boolean emailSent = emailService.sendHtmlMessage("robertkexim1998@gmail.com", "Invoice Details", invoice, "invoice");

        System.out.println(emailSent);
    }

}
