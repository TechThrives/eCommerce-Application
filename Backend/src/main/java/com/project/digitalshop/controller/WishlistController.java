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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.digitalshop.dto.wishlist.WishlistDTO;
import com.project.digitalshop.dto.wishlist.WishlistResponseDTO;
import com.project.digitalshop.services.interfaces.IWishlistService;

import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping("/api/wishlists")
public class WishlistController {

    private final IWishlistService wishlistService;

    public WishlistController(IWishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping("/add")
    public ResponseEntity<WishlistResponseDTO> createOrUpdateWishlist(@Valid @RequestBody WishlistDTO wishlistDTO) {
        WishlistResponseDTO updatedWishlist = wishlistService.addProductToWishlist(wishlistDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updatedWishlist);
    }

    @PostMapping("/remove")
    public ResponseEntity<WishlistResponseDTO> deleteProductFromWishlist(@Valid @RequestBody WishlistDTO wishlistDTO) {
        WishlistResponseDTO updatedWishlist = wishlistService.deleteProductFromWishlist(wishlistDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updatedWishlist);
    }

    @DeleteMapping("/{wishlistId}")
    public ResponseEntity<Void> deleteWishlist(@PathVariable UUID wishlistId) {
        wishlistService.deleteWishlist(wishlistId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{wishlistId}")
    public ResponseEntity<WishlistResponseDTO> getWishlistById(@PathVariable UUID wishlistId,
            @RequestParam(required = false) String searchVal) {
        WishlistResponseDTO wishlistResponseDTO = wishlistService.getWishlistById(wishlistId, searchVal);
        return ResponseEntity.status(HttpStatus.OK).body(wishlistResponseDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<WishlistResponseDTO> getWishlistByUserId(@PathVariable UUID userId,
            @RequestParam(required = false) String searchVal) {
        WishlistResponseDTO wishlistResponseDTO = wishlistService.getWishlistByUserId(userId, searchVal);
        return ResponseEntity.status(HttpStatus.OK).body(wishlistResponseDTO);
    }
}
