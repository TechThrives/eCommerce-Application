package com.project.digitalshop.dto.wishlist;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class WishlistDTO {
    @NotNull(message = "User Id is required")
    private UUID userId;

    @NotNull(message = "Product Id is required")
    private UUID productId;
}
