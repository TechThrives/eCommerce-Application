package com.project.digitalshop.dto.checkout;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class Checkout {
    @NotBlank(message = "Session is required")
    private String sessionId;
}
