package com.project.digitalshop.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.digitalshop.dto.product.ProductDTO;
import com.project.digitalshop.dto.product.ProductResponseDTO;
import com.project.digitalshop.dto.product.ProductUpdateDTO;
import com.project.digitalshop.services.interfaces.IProductService;

import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping("/api/products")
public class ProductController {

    private final IProductService productService;

    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @ModelAttribute ProductDTO productDTO) {
        ProductResponseDTO createdProduct = productService.createProduct(productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable UUID productId,
            @Valid @ModelAttribute ProductUpdateDTO productUpdateDTO) {
        ProductResponseDTO updatedProduct = productService.updateProduct(productId, productUpdateDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updatedProduct);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable UUID productId) {
        ProductResponseDTO productResponseDTO = productService.getProductById(productId);
        return ResponseEntity.status(HttpStatus.OK).body(productResponseDTO);
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ProductResponseDTO> getProductBySlug(@PathVariable String slug) {
        ProductResponseDTO productResponseDTO = productService.getProductBySlug(slug);
        return ResponseEntity.status(HttpStatus.OK).body(productResponseDTO);
    }

    @GetMapping
    public ResponseEntity<Page<ProductResponseDTO>> getAllProducts(
            @RequestParam(required = false) String searchVal,
            @RequestParam(required = false) List<String> tags,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "none") String sortBy,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {

        Page<ProductResponseDTO> productsPage = productService.getAllProducts(searchVal, tags, minPrice, maxPrice,
                sortBy,
                pageNo, pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(productsPage);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<ProductResponseDTO>> getAllProductsByCategoryId(
            @PathVariable UUID categoryId,
            @RequestParam(required = false) String searchVal,
            @RequestParam(required = false) List<String> tags,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "none") String sortBy,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {

        Page<ProductResponseDTO> productsPage = productService.getAllProductsByCategoryId(
                categoryId, searchVal, tags, minPrice, maxPrice,
                sortBy,
                pageNo, pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(productsPage);
    }

    @GetMapping("/category/slug/{categorySlug}")
    public ResponseEntity<Page<ProductResponseDTO>> getAllProductsByCategorySlug(
            @PathVariable String categorySlug,
            @RequestParam(required = false) String searchVal,
            @RequestParam(required = false) List<String> tags,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "none") String sortBy,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {

        Page<ProductResponseDTO> productsPage = productService.getAllProductsByCategorySlug(
                categorySlug, searchVal, tags, minPrice,
                maxPrice,
                sortBy,
                pageNo, pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(productsPage);
    }
}