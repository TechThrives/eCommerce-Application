package com.project.digitalshop.dto.wishlist;

import java.util.List;
import java.util.UUID;

import com.project.digitalshop.dto.product.ProductResponseDTO;

import lombok.Data;

@Data
public class WishlistResponseDTO {
    private UUID id;
    private UUID userId;
    private List<ProductResponseDTO> products;
    private int productCount;
}
