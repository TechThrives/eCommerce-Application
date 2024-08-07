package com.project.digitalshop.dto.authentication;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RefreshTokenRequest {
    @NotBlank(message = "Refresh Token is required")
    private String refreshToken;
}
