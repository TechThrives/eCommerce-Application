package com.project.digitalshop.dto.cart;

import java.util.List;
import java.util.UUID;

import com.project.digitalshop.dto.product.ProductResponseDTO;

import lombok.Data;

@Data
public class CartResponseDTO {
    private UUID id;
    private UUID userId;
    private List<ProductResponseDTO> products;
    private int productCount;
}
