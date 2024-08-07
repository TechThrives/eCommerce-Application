package com.project.digitalshop.repository;

import com.project.digitalshop.model.Category;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID>, JpaSpecificationExecutor<Category> {

    Optional<Category> findBySlug(String slug);

    Page<Category> findAll(Specification<Category> specification, Pageable pageable);
}
