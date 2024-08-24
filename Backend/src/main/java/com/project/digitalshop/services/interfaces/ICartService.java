package com.project.digitalshop.services.interfaces;

import com.project.digitalshop.dto.cart.CartDTO;
import com.project.digitalshop.dto.cart.CartResponseDTO;
import jakarta.validation.Valid;

import java.util.UUID;

import org.springframework.validation.annotation.Validated;

@Validated
public interface ICartService {
    CartResponseDTO addProductToCart(@Valid CartDTO cartDTO);

    CartResponseDTO deleteProductFromCart(@Valid CartDTO cartDTO);

    void deleteCart(UUID cartId);

    CartResponseDTO getCartById(UUID cartId);

    CartResponseDTO getCartByUserId(UUID userId);
}
