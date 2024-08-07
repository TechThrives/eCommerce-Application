package com.project.digitalshop.dto.authentication;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ResetPasswordRequest {
    @NotBlank(message = "Token is required")
    private String token;

    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{6,}$", message = "Password must be at least 6 characters long and contain at least one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace.")
    private String password;

    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{6,}$", message = "Confirm Password must be at least 6 characters long and contain at least one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace.")
    private String confirmPassword;
}
