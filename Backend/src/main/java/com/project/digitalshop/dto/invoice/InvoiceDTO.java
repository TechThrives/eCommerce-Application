package com.project.digitalshop.dto.invoice;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InvoiceDTO {
    @NotNull(message = "User Id is required")
    private UUID userId;

    @NotNull(message = "Product Ids are required")
    private List<UUID> productIds;

    @NotNull(message = "Sub Total is required")
    private BigDecimal subTotal;

    @NotNull(message = "Tax is required")
    private BigDecimal tax;

    @NotNull(message = "Total Price is required")
    private BigDecimal totalPrice;
}
