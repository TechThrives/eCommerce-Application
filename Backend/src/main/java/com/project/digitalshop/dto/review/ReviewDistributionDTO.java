package com.project.digitalshop.dto.review;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReviewDistributionDTO {
    private int stars; 
    private long count; 
    private String percentage;
}
