package com.project.digitalshop.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.digitalshop.dto.cart.CartDTO;
import com.project.digitalshop.dto.cart.CartResponseDTO;
import com.project.digitalshop.services.interfaces.ICartService;

import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping("/api/carts")
public class CartController {

    private final ICartService cartService;

    public CartController(ICartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponseDTO> createOrUpdateCart(@Valid @RequestBody CartDTO cartDTO) {
        CartResponseDTO updatedCart = cartService.addProductToCart(cartDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updatedCart);
    }

    @PostMapping("/remove")
    public ResponseEntity<CartResponseDTO> deleteProductFromCart(@Valid @RequestBody CartDTO cartDTO) {
        CartResponseDTO updatedCart = cartService.deleteProductFromCart(cartDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updatedCart);
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<Void> deleteCart(@PathVariable UUID cartId) {
        cartService.deleteCart(cartId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<CartResponseDTO> getCartById(@PathVariable UUID cartId) {
        CartResponseDTO cartResponseDTO = cartService.getCartById(cartId);
        return ResponseEntity.status(HttpStatus.OK).body(cartResponseDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<CartResponseDTO> getCartByUserId(@PathVariable UUID userId) {
        CartResponseDTO cartResponseDTO = cartService.getCartByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(cartResponseDTO);
    }
}
