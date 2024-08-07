package com.project.digitalshop.services.interfaces;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.authentication.ForgotPasswordRequest;
import com.project.digitalshop.dto.authentication.RefreshTokenRequest;
import com.project.digitalshop.dto.authentication.ResetPasswordRequest;
import com.project.digitalshop.dto.authentication.SignInRequest;
import com.project.digitalshop.dto.authentication.SignInResponse;
import com.project.digitalshop.dto.authentication.SignUpRequest;

import jakarta.validation.Valid;

@Validated
public interface IAuthenticationService {
    SignInResponse signIn(@Valid SignInRequest request);

    ResponseEntity<Object> signUp(@Valid SignUpRequest request);

    SignInResponse refreshToken(@Valid RefreshTokenRequest request);

    ResponseEntity<Object> forgotPassword(@Valid ForgotPasswordRequest request);

    ResponseEntity<Object> resetPassword(@Valid ResetPasswordRequest request);
}
