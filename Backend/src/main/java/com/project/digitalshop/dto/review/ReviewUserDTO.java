package com.project.digitalshop.dto.review;

import java.util.UUID;

import lombok.Data;

@Data
public class ReviewUserDTO {
    private UUID id;
    private String profileImageUrl;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
}
