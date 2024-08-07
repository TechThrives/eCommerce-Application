package com.project.digitalshop.dto.review;

import java.util.UUID;

import lombok.Data;

@Data
public class ReviewProductDTO {
    private UUID id;
    private String name;
    private String slug;
}
