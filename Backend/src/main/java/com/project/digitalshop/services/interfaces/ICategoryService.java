package com.project.digitalshop.services.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.category.CategoryDTO;
import com.project.digitalshop.dto.category.CategoryResponseDTO;

import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

@Validated
public interface ICategoryService {
    CategoryResponseDTO createCategory(@Valid CategoryDTO categoryDTO);

    CategoryResponseDTO updateCategory(UUID categoryId, @Valid CategoryDTO categoryDTO);

    void deleteCategory(UUID categoryId);

    CategoryResponseDTO getCategoryById(UUID categoryId);

    CategoryResponseDTO getCategoryBySlug(String slug);

    Page<CategoryResponseDTO> getAllCategories(String searchVal, int pageNo, int pageSize);

    List<CategoryResponseDTO> getAllCategories();
}
