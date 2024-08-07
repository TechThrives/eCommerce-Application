package com.project.digitalshop.dto.authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SignUpRequest {
    @NotBlank(message = "First Name is required")
    private String firstName;

    @NotBlank(message = "Last Name is required")
    private String lastName;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+\\d{1,3}[\\s-]?\\d{10}$", message = "Invalid Phone Number format. Please use format: +91 9876543210")
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{6,}$", message = "Password must be at least 6 characters long and contain at least one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace.")
    private String password;

    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{6,}$", message = "Confirm Password must be at least 6 characters long and contain at least one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace.")
    private String confirmPassword;
}
