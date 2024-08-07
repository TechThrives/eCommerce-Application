package com.project.digitalshop.dto.user;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Data;

@Data
public class UserResponseDTO {
    private UUID id;
    private String profileImageUrl;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private LocalDateTime createdOn;
    private LocalDateTime modifiedOn;
}
