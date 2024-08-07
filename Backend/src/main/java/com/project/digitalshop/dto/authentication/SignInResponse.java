package com.project.digitalshop.dto.authentication;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignInResponse {

    private String jwtToken;
    private String refreshToken;
}
