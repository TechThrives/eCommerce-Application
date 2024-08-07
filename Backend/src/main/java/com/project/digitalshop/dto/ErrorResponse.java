package com.project.digitalshop.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private String message;
    private List<String> details;
}
