package com.project.digitalshop.dto.product;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;
import java.util.List;

import com.project.digitalshop.dto.category.CategoryProductDTO;

import lombok.Data;

@Data
public class ProductResponseDTO {
    private UUID id;
    private List<String> imageUrls;
    private String name;
    private String slug;
    private String overview;
    private String shortDescription;
    private String description;
    private float avgRating;
    private int reviewCount;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Set<String> tags;
    private CategoryProductDTO category;
    private LocalDateTime createdOn;
    private LocalDateTime modifiedOn;
}
