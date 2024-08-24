package com.project.digitalshop.services.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.wishlist.WishlistDTO;
import com.project.digitalshop.dto.wishlist.WishlistResponseDTO;
import com.project.digitalshop.dto.category.CategoryProductDTO;
import com.project.digitalshop.dto.product.ProductResponseDTO;
import com.project.digitalshop.exception.NotFoundException;
import com.project.digitalshop.model.Wishlist;
import com.project.digitalshop.model.Product;
import com.project.digitalshop.model.User;
import com.project.digitalshop.repository.WishlistRepository;
import com.project.digitalshop.repository.ProductRepository;
import com.project.digitalshop.repository.UserRepository;
import com.project.digitalshop.services.interfaces.IWishlistService;

import jakarta.validation.Valid;

@Service
@Validated
public class WishlistService implements IWishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public WishlistService(WishlistRepository wishlistRepository, UserRepository userRepository,
            ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    private WishlistResponseDTO modifyWishlist(WishlistDTO wishlistDTO, boolean productFlag) {
        User user = userRepository.findById(wishlistDTO.getUserId())
                .orElseThrow(() -> new NotFoundException("User Not Found!!!"));
        Product productModel = productRepository.findById(wishlistDTO.getProductId())
                .orElseThrow(() -> new NotFoundException("Product Not Found!!!"));

        Wishlist wishlist = wishlistRepository.findByUserId(wishlistDTO.getUserId())
                .orElseGet(() -> {
                    Wishlist newWishlist = new Wishlist();
                    newWishlist.setUser(user);
                    newWishlist.setProducts(new ArrayList<>());
                    return newWishlist;
                });

        if (productFlag) {
            if (wishlist.getProducts().stream().noneMatch(p -> p.getId().equals(wishlistDTO.getProductId()))) {
                wishlist.getProducts().add(productModel);
            }
        } else {
            wishlist.getProducts().removeIf(p -> p.getId().equals(wishlistDTO.getProductId()));
        }

        wishlist = wishlistRepository.save(wishlist);

        int productCount = wishlist.getProductCount();
        WishlistResponseDTO wishlistResponseDTO = new WishlistResponseDTO();
        BeanUtils.copyProperties(wishlist, wishlistResponseDTO, "products", "user");
        wishlistResponseDTO.setUserId(wishlist.getUser().getId());
        wishlistResponseDTO.setProductCount(productCount);
        wishlistResponseDTO.setProducts(wishlist.getProducts().stream().map(product -> {
            ProductResponseDTO productResponseDTO = new ProductResponseDTO();
            BeanUtils.copyProperties(product, productResponseDTO);

            CategoryProductDTO categoryDTO = new CategoryProductDTO();
            BeanUtils.copyProperties(product.getCategory(), categoryDTO);
            productResponseDTO.setCategory(categoryDTO);
            return productResponseDTO;
        }).collect(Collectors.toList()));

        return wishlistResponseDTO;
    }

    @Override
    public WishlistResponseDTO addProductToWishlist(@Valid WishlistDTO wishlistDTO) {
        return modifyWishlist(wishlistDTO, true);
    }

    @Override
    public WishlistResponseDTO deleteProductFromWishlist(@Valid WishlistDTO wishlistDTO) {
        return modifyWishlist(wishlistDTO, false);
    }

    @Override
    public void deleteWishlist(UUID wishlistId) {
        if (!wishlistRepository.existsById(wishlistId)) {
            throw new NotFoundException("Wishlist Not Found!!!");
        }
        Wishlist wishlist = wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new NotFoundException("Wishlist Not Found!!!"));

        // Clear the products list from the wishlist
        wishlist.getProducts().clear();
        wishlistRepository.save(wishlist);
        wishlistRepository.deleteById(wishlistId);
    }

    @Override
    public WishlistResponseDTO getWishlistById(UUID wishlistId) {
        Wishlist wishlist = wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new NotFoundException("Wishlist Not Found!!!"));
        List<Product> products = wishlist.getProducts();
        // Calculate product count
        int productCount = wishlist.getProductCount();
        WishlistResponseDTO wishlistResponseDTO = new WishlistResponseDTO();
        BeanUtils.copyProperties(wishlist, wishlistResponseDTO, "products", "user");
        wishlistResponseDTO.setUserId(wishlist.getUser().getId());
        wishlistResponseDTO.setProductCount(productCount);
        wishlistResponseDTO.setProducts(products.stream().map(product -> {
            ProductResponseDTO productResponseDTO = new ProductResponseDTO();
            BeanUtils.copyProperties(product, productResponseDTO);

            // Map Category to CategoryDTO
            CategoryProductDTO categoryDTO = new CategoryProductDTO();
            BeanUtils.copyProperties(product.getCategory(), categoryDTO);
            productResponseDTO.setCategory(categoryDTO);
            return productResponseDTO;
        }).collect(Collectors.toList()));
        return wishlistResponseDTO;
    }

    @Override
    public WishlistResponseDTO getWishlistByUserId(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User Not Found!!!"));

        Wishlist wishlist = wishlistRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Wishlist newWishlist = new Wishlist();
                    newWishlist.setUser(user);
                    newWishlist.setProducts(new ArrayList<>());
                    return newWishlist;
                });

        wishlist = wishlistRepository.save(wishlist);

        List<Product> products = wishlist.getProducts();
        // Calculate product count
        int productCount = wishlist.getProductCount();
        WishlistResponseDTO wishlistResponseDTO = new WishlistResponseDTO();
        BeanUtils.copyProperties(wishlist, wishlistResponseDTO, "products", "user");
        wishlistResponseDTO.setUserId(wishlist.getUser().getId());
        wishlistResponseDTO.setProductCount(productCount);
        wishlistResponseDTO.setProducts(products.stream().map(product -> {
            ProductResponseDTO productResponseDTO = new ProductResponseDTO();
            BeanUtils.copyProperties(product, productResponseDTO);

            // Map Category to CategoryDTO
            CategoryProductDTO categoryDTO = new CategoryProductDTO();
            BeanUtils.copyProperties(product.getCategory(), categoryDTO);
            productResponseDTO.setCategory(categoryDTO);
            return productResponseDTO;
        }).collect(Collectors.toList()));
        return wishlistResponseDTO;
    }
}
