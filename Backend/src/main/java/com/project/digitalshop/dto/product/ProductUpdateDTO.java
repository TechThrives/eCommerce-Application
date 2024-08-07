package com.project.digitalshop.dto.product;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductUpdateDTO {
    @Size(min = 0)
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
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than zero")
    private BigDecimal price;
    @NotNull(message = "Original Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Original Price must be greater than zero")
    private BigDecimal originalPrice;
    @NotEmpty(message = "Tags is required")
    private Set<String> tags;
}
