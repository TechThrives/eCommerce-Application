package com.project.digitalshop.services.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.digitalshop.dto.product.ProductDTO;
import com.project.digitalshop.dto.product.ProductResponseDTO;
import com.project.digitalshop.dto.product.ProductUpdateDTO;

import jakarta.validation.Valid;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Validated
public interface IProductService {
        ProductResponseDTO createProduct(@Valid ProductDTO productDTO);

        ProductResponseDTO updateProduct(UUID productId, @Valid ProductUpdateDTO productUpdateDTO);

        void deleteProduct(UUID productId);

        ProductResponseDTO getProductById(UUID productId);

        ProductResponseDTO getProductBySlug(String slug);

        Page<ProductResponseDTO> getAllProducts(String searchVal, List<String> tags,
                        BigDecimal minPrice, BigDecimal maxPrice, String sortBy, int pageNo, int pageSize);

        Page<ProductResponseDTO> getAllProductsByCategoryId(UUID categoryId, String searchVal, List<String> tags,
                        BigDecimal minPrice, BigDecimal maxPrice, String sortBy, int pageNo, int pageSize);

        Page<ProductResponseDTO> getAllProductsByCategorySlug(String categorySlug, String searchVal, List<String> tags,
                        BigDecimal minPrice, BigDecimal maxPrice, String sortBy, int pageNo, int pageSize);

        List<ProductResponseDTO> getTopProducts(int count);

        List<String> getTagSuggestions(String input);
}
