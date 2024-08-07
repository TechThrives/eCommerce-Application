package com.project.digitalshop.dto.invoice;

import java.util.UUID;

import lombok.Data;

@Data
public class InvoiceUserDTO {
    private UUID id;
    private String profileImageUrl;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
}
