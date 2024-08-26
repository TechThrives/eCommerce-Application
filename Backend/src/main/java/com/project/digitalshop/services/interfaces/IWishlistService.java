package com.project.digitalshop.services.interfaces;

import java.util.UUID;

import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.wishlist.WishlistDTO;
import com.project.digitalshop.dto.wishlist.WishlistResponseDTO;

import jakarta.validation.Valid;

@Validated
public interface IWishlistService {
    WishlistResponseDTO addProductToWishlist(@Valid WishlistDTO wishlistDTO);

    WishlistResponseDTO deleteProductFromWishlist(@Valid WishlistDTO wishlistDTO);

    void deleteWishlist(UUID wishlistId);

    WishlistResponseDTO getWishlistById(UUID wishlistId);

    WishlistResponseDTO getWishlistByUserId(UUID userId);
}
