package com.project.digitalshop.dto.invoice;

import com.project.digitalshop.model.PaymentMethod;
import com.project.digitalshop.model.PaymentStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InvoiceUpdateDTO {
    @NotNull(message = "Payment Status is required")
    private PaymentStatus paymentStatus;
    @NotNull(message = "Payment Method is required")
    private PaymentMethod paymentMethod;
}
