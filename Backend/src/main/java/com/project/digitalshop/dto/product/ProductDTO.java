package com.project.digitalshop.dto.product;

import java.math.BigDecimal;
import java.util.Set;
import java.util.UUID;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductDTO {
    @NotNull(message = "Images are required")
    @Size(min = 1, message = "At least one image must be provided")
    private List<MultipartFile> images;
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Overview is required")
    private String overview;
    @NotBlank(message = "Short Description is required")
    private String shortDescription;
    @NotBlank(message = "Description is required")
    private String description;
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Price must smaller than Original Price")
    private BigDecimal price;
    @NotNull(message = "Original Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Original Price must be greater than zero")
    private BigDecimal originalPrice;
    @NotEmpty(message = "Tags is required")
    private Set<String> tags;
    @NotNull(message = "Category is required")
    private UUID categoryId;
}
