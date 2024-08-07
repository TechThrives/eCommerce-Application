package com.project.digitalshop.dto.category;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Data;

@Data
public class CategoryResponseDTO {
    private UUID id;
    private String name;
    private String slug;
    private int productCount;
    private String description;
    private LocalDateTime createdOn;
    private LocalDateTime modifiedOn;
}
