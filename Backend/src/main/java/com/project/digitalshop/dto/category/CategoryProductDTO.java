package com.project.digitalshop.dto.category;

import java.util.UUID;

import lombok.Data;

@Data
public class CategoryProductDTO {
    private UUID id;
    private String name;
    private String slug;
}
