package com.project.digitalshop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.digitalshop.dto.authentication.ForgotPasswordRequest;
import com.project.digitalshop.dto.authentication.RefreshTokenRequest;
import com.project.digitalshop.dto.authentication.ResetPasswordRequest;
import com.project.digitalshop.dto.authentication.SignInRequest;
import com.project.digitalshop.dto.authentication.SignInResponse;
import com.project.digitalshop.dto.authentication.SignUpRequest;
import com.project.digitalshop.services.interfaces.IAuthenticationService;

import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final IAuthenticationService authService;

    public AuthenticationController(IAuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Object> signUp(
            @Valid @RequestBody SignUpRequest request) {
        ResponseEntity<Object> response = authService.signUp(request);
        return (response);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<SignInResponse> signIn(
            @Valid @RequestBody SignInRequest request) {
        SignInResponse response = authService.signIn(request);
        // HttpHeaders responseHeaders = new HttpHeaders();
        // responseHeaders.add("Authorization", "Bearer " + response.getJwtToken());
        // return
        // ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(response);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<SignInResponse> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request) {
        SignInResponse response = authService.refreshToken(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Object> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        return authService.forgotPassword(request);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Object> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        return authService.resetPassword(request);
    }
}