package com.project.digitalshop.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.digitalshop.dto.MessageResponse;
import com.project.digitalshop.model.RefreshToken;
import com.project.digitalshop.repository.RefreshTokenRepository;
import com.project.digitalshop.services.implementation.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;

@Configuration
public class CustomLogoutHandler implements LogoutHandler {

    private final JwtService jwtService;
    private final RefreshTokenRepository refreshTokenRepository;

    public CustomLogoutHandler(JwtService jwtService, RefreshTokenRepository refreshTokenRepository) {
        this.jwtService = jwtService;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    public void logout(HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) {
        String authHeader = request.getHeader("Authorization");

        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String username = jwtService.extractUsername(token);

                if (username != null) {
                    Optional<RefreshToken> refreshTokenOpt = refreshTokenRepository.findByUserUsername(username);

                    if (refreshTokenOpt.isPresent()) {
                        RefreshToken refreshToken = refreshTokenOpt.get();
                        refreshTokenRepository.delete(refreshToken);
                    }
                }
            }

            MessageResponse messageResponse = new MessageResponse("Logout Successfully!!!");
            response.setContentType("application/json;charset=UTF-8");
            response.setStatus(HttpStatus.OK.value());
            PrintWriter writer = response.getWriter();
            writer.write(new ObjectMapper().writeValueAsString(messageResponse));
            writer.flush();
            writer.close();

        } catch (IOException ex) {
            throw new RuntimeException("Failed to write response: " + ex.getMessage());
        }
    }
}
