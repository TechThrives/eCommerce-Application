package com.project.digitalshop.dto.user;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserUpdateDTO {

    private MultipartFile image;

    @NotBlank(message = "First Name is required")
    private String firstName;

    @NotBlank(message = "Last Name is required")
    private String lastName;

    // @NotBlank(message = "Phone number is required")
    // @Pattern(regexp = "^\\+\\d{1,3}[\\s-]?\\d{10}$", message = "Invalid Phone Number format. Please use format: +91 9876543210")
    // private String phoneNumber;
}
