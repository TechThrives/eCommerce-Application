package com.project.digitalshop.dto.review;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Data;

@Data
public class ReviewResponseDTO {
    private UUID id;
    private ReviewProductDTO product;
    private ReviewUserDTO user;
    private String reviewText;
    private float rating;
    private LocalDateTime reviewDate;
    private LocalDateTime modifiedOn;
}
