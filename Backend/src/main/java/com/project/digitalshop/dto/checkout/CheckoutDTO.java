package com.project.digitalshop.dto.checkout;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CheckoutDTO {
    @NotNull(message = "User is required")
    private UUID userId;
    @NotNull(message = "Sub Total is required")
    private BigDecimal subTotal;
    @NotNull(message = "Tax is required")
    private BigDecimal tax;
    @NotNull(message = "Grand Total is required")
    private BigDecimal grandTotal;
    @NotNull(message = "Products are required")
    @Size(min = 1, message = "At least one product must be provided")
    private List<UUID> productIds;
}
