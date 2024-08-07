package com.project.digitalshop.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.digitalshop.dto.category.CategoryDTO;
import com.project.digitalshop.dto.category.CategoryResponseDTO;
import com.project.digitalshop.services.interfaces.ICategoryService;

import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping("/api/categories")
public class CategoryController {

    private final ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<CategoryResponseDTO> createCategory(@Valid @RequestBody CategoryDTO categoryDTO) {
        CategoryResponseDTO createdCategory = categoryService.createCategory(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryResponseDTO> updateCategory(@PathVariable UUID categoryId,
            @Valid @RequestBody CategoryDTO categoryDTO) {
        CategoryResponseDTO updatedProduct = categoryService.updateCategory(categoryId, categoryDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updatedProduct);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryResponseDTO> getCategoryById(@PathVariable UUID categoryId) {
        CategoryResponseDTO categoryResponseDTO = categoryService.getCategoryById(categoryId);
        return ResponseEntity.status(HttpStatus.OK).body(categoryResponseDTO);
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<CategoryResponseDTO> getCategoryBySlug(@PathVariable String slug) {
        CategoryResponseDTO categoryResponseDTO = categoryService.getCategoryBySlug(slug);
        return ResponseEntity.status(HttpStatus.OK).body(categoryResponseDTO);
    }

    @GetMapping
    public ResponseEntity<Page<CategoryResponseDTO>> getAllCategories(
            @RequestParam(required = false) String searchVal,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        Page<CategoryResponseDTO> categoriesPage = categoryService.getAllCategories(searchVal, pageNo, pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(categoriesPage);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
        List<CategoryResponseDTO> categoriesPage = categoryService.getAllCategories();
        return ResponseEntity.status(HttpStatus.OK).body(categoriesPage);
    }
}
