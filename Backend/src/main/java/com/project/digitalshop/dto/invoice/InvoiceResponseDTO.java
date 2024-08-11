package com.project.digitalshop.dto.invoice;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.project.digitalshop.dto.product.ProductResponseDTO;
import com.project.digitalshop.model.PaymentStatus;
import com.project.digitalshop.model.PaymentMethod;
import lombok.Data;

@Data
public class InvoiceResponseDTO {
    private UUID id;
    private InvoiceUserDTO user;
    private List<ProductResponseDTO> products;
    private BigDecimal subTotal;
    private BigDecimal tax;
    private BigDecimal totalPrice;
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;
    private LocalDateTime createdOn;
}
