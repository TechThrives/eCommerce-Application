package com.project.digitalshop.dto.review;

import java.util.List;

import com.project.digitalshop.dto.product.ProductResponseDTO;

import lombok.Data;

@Data
public class ProductReviewSummaryDTO {
    private long reviewCount;
    private float avgRating;
    private ProductResponseDTO product;
    private List<ReviewDistributionDTO> reviewDistribution;
}
