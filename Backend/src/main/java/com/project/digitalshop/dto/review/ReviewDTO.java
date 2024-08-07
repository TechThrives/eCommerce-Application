package com.project.digitalshop.dto.review;

import java.util.UUID;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewDTO {
    @NotNull(message = "User is required")
    private UUID userId;
    @NotNull(message = "Product is required")
    private UUID productId;
    @NotBlank(message = "Review Text is required")
    private String reviewText;
    @NotNull(message = "Rating is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Rating must be greater than zero")
    @DecimalMax(value = "5.0", inclusive = true, message = "Rating must be less than five")
    private float rating;
}
