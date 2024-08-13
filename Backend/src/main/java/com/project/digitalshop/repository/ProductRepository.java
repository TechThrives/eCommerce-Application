package com.project.digitalshop.repository;

import com.project.digitalshop.model.Product;
import com.project.digitalshop.model.Category;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID>, JpaSpecificationExecutor<Product> {
    Optional<Product> findBySlug(String slug);

    Page<Product> findAll(Specification<Product> filterProducts, Pageable pageable);

    List<Product> findByCategory(Category category);

    @Query("SELECT DISTINCT tag FROM Product p JOIN p.tags tag")
    Set<String> findAllTags();
}
