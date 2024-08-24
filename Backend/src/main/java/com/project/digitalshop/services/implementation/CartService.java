package com.project.digitalshop.services.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.cart.CartDTO;
import com.project.digitalshop.dto.cart.CartResponseDTO;
import com.project.digitalshop.dto.category.CategoryProductDTO;
import com.project.digitalshop.dto.product.ProductResponseDTO;
import com.project.digitalshop.exception.NotFoundException;
import com.project.digitalshop.model.Cart;
import com.project.digitalshop.model.Product;
import com.project.digitalshop.model.User;
import com.project.digitalshop.repository.CartRepository;
import com.project.digitalshop.repository.ProductRepository;
import com.project.digitalshop.repository.UserRepository;
import com.project.digitalshop.services.interfaces.ICartService;

import jakarta.validation.Valid;

@Service
@Validated
public class CartService implements ICartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository, UserRepository userRepository,
            ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    private CartResponseDTO modifyCart(CartDTO cartDTO, boolean productFlag) {
        User user = userRepository.findById(cartDTO.getUserId())
                .orElseThrow(() -> new NotFoundException("User Not Found!!!"));
        Product productModel = productRepository.findById(cartDTO.getProductId())
                .orElseThrow(() -> new NotFoundException("Product Not Found!!!"));

        Cart cart = cartRepository.findByUserId(cartDTO.getUserId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setProducts(new ArrayList<>());
                    return newCart;
                });

        if (productFlag) {
            if (cart.getProducts().stream().noneMatch(p -> p.getId().equals(cartDTO.getProductId()))) {
                cart.getProducts().add(productModel);
            }
        } else {
            cart.getProducts().removeIf(p -> p.getId().equals(cartDTO.getProductId()));
        }

        cart = cartRepository.save(cart);

        int productCount = cart.getProductCount();
        CartResponseDTO cartResponseDTO = new CartResponseDTO();
        BeanUtils.copyProperties(cart, cartResponseDTO, "products", "user");
        cartResponseDTO.setUserId(cart.getUser().getId());
        cartResponseDTO.setProductCount(productCount);
        cartResponseDTO.setProducts(cart.getProducts().stream().map(product -> {
            ProductResponseDTO productResponseDTO = new ProductResponseDTO();
            BeanUtils.copyProperties(product, productResponseDTO);

            CategoryProductDTO categoryDTO = new CategoryProductDTO();
            BeanUtils.copyProperties(product.getCategory(), categoryDTO);
            productResponseDTO.setCategory(categoryDTO);
            return productResponseDTO;
        }).collect(Collectors.toList()));

        return cartResponseDTO;
    }

    @Override
    public CartResponseDTO addProductToCart(@Valid CartDTO cartDTO) {
        return modifyCart(cartDTO, true);
    }

    @Override
    public CartResponseDTO deleteProductFromCart(@Valid CartDTO cartDTO) {
        return modifyCart(cartDTO, false);
    }

    @Override
    public void deleteCart(UUID cartId) {
        if (!cartRepository.existsById(cartId)) {
            throw new NotFoundException("Cart Not Found!!!");
        }
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new NotFoundException("Cart Not Found!!!"));

        // Clear the products list from the cart
        cart.getProducts().clear();
        cartRepository.save(cart);
        cartRepository.deleteById(cartId);
    }

    @Override
    public CartResponseDTO getCartById(UUID cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new NotFoundException("Cart Not Found!!!"));
        List<Product> products = cart.getProducts();
        // Calculate product count
        int productCount = cart.getProductCount();
        CartResponseDTO cartResponseDTO = new CartResponseDTO();
        BeanUtils.copyProperties(cart, cartResponseDTO, "products", "user");
        cartResponseDTO.setUserId(cart.getUser().getId());
        cartResponseDTO.setProductCount(productCount);
        cartResponseDTO.setProducts(products.stream().map(product -> {
            ProductResponseDTO productResponseDTO = new ProductResponseDTO();
            BeanUtils.copyProperties(product, productResponseDTO);

            // Map Category to CategoryDTO
            CategoryProductDTO categoryDTO = new CategoryProductDTO();
            BeanUtils.copyProperties(product.getCategory(), categoryDTO);
            productResponseDTO.setCategory(categoryDTO);
            return productResponseDTO;
        }).collect(Collectors.toList()));
        return cartResponseDTO;
    }

    @Override
    public CartResponseDTO getCartByUserId(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User Not Found!!!"));

        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setProducts(new ArrayList<>());
                    return newCart;
                });
        
        cart = cartRepository.save(cart);

        List<Product> products = cart.getProducts();
        // Calculate product count
        int productCount = cart.getProductCount();
        CartResponseDTO cartResponseDTO = new CartResponseDTO();
        BeanUtils.copyProperties(cart, cartResponseDTO, "products", "user");
        cartResponseDTO.setUserId(cart.getUser().getId());
        cartResponseDTO.setProductCount(productCount);
        cartResponseDTO.setProducts(products.stream().map(product -> {
            ProductResponseDTO productResponseDTO = new ProductResponseDTO();
            BeanUtils.copyProperties(product, productResponseDTO);

            // Map Category to CategoryDTO
            CategoryProductDTO categoryDTO = new CategoryProductDTO();
            BeanUtils.copyProperties(product.getCategory(), categoryDTO);
            productResponseDTO.setCategory(categoryDTO);
            return productResponseDTO;
        }).collect(Collectors.toList()));
        return cartResponseDTO;
    }
}
