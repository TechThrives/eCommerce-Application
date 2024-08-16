package com.project.digitalshop.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.digitalshop.dto.ErrorResponse;
import com.project.digitalshop.filter.JwtAuthenticationFilter;
import com.project.digitalshop.services.implementation.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
        private final CustomUserDetailsService userDetailsService;
        private final JwtAuthenticationFilter jwtAuthenticationFilter;
        private final CustomLogoutHandler logoutHandler;

        public SecurityConfig(CustomUserDetailsService userDetailsService,
                        JwtAuthenticationFilter jwtAuthenticationFilter,
                        CustomLogoutHandler logoutHandler) {
                this.userDetailsService = userDetailsService;
                this.jwtAuthenticationFilter = jwtAuthenticationFilter;
                this.logoutHandler = logoutHandler;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

                return http
                                .csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**",
                                                                "/swagger-resources/**", "/configuration/**",
                                                                "/swagger-ui.html", "/actuator/**")
                                                .permitAll()
                                                .requestMatchers("/", "/api/auth/**").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/products").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/products/slug/*").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/products/category/slug/*").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/products/tags/suggestions/*").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/products/top/*").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/categories").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/categories/slug/*").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/categories/all").permitAll()
                                                .requestMatchers(HttpMethod.DELETE, "/api/reviews/*").permitAll() // TODO: Add permission
                                                .requestMatchers(HttpMethod.GET, "/api/reviews/product/slug/*").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/reviews/product-summary/slug/*").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/reviews/user/*").permitAll() // TODO: Add permission
                                                .requestMatchers(HttpMethod.DELETE, "/api/invoices/*").permitAll() // TODO: Add permission
                                                .requestMatchers(HttpMethod.GET, "/api/invoices/user/*").permitAll() // TODO: Add permission
                                                .anyRequest().authenticated())
                                .userDetailsService(userDetailsService)
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                                .exceptionHandling(e -> e
                                                .authenticationEntryPoint((request, response, authException) -> {
                                                        response.setContentType("application/json");
                                                        response.setStatus(HttpStatus.UNAUTHORIZED.value());
                                                        ErrorResponse errorResponse = new ErrorResponse(
                                                                        "Unauthorized",
                                                                        Arrays.asList("You need to authenticate to access this resource."));
                                                        response.getWriter().write(new ObjectMapper()
                                                                        .writeValueAsString(errorResponse));
                                                })
                                                .accessDeniedHandler((request, response, accessDeniedException) -> {
                                                        response.setContentType("application/json");
                                                        response.setStatus(HttpStatus.FORBIDDEN.value());
                                                        ErrorResponse errorResponse = new ErrorResponse(
                                                                        "Access Denied",
                                                                        Arrays.asList("You do not have permission to access this resource."));
                                                        response.getWriter().write(new ObjectMapper()
                                                                        .writeValueAsString(errorResponse));
                                                }))

                                .logout(l -> l
                                                .logoutUrl("/api/auth/sign-out")
                                                .addLogoutHandler(logoutHandler)
                                                .logoutSuccessHandler(
                                                                (request, response,
                                                                                authentication) -> SecurityContextHolder
                                                                                                .clearContext()))
                                .build();

        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
                return configuration.getAuthenticationManager();
        }
}