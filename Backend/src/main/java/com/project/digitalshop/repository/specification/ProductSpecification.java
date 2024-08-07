package com.project.digitalshop.repository.specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.domain.Specification;
import com.project.digitalshop.model.Product;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class ProductSpecification {

    public static Specification<Product> filterProducts(String searchVal, List<String> tags, BigDecimal minPrice,
            BigDecimal maxPrice) {
        return (Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            query.distinct(true);
            // Initialize predicates list
            List<Predicate> predicates = new ArrayList<>();

            // Add search predicate (if search term is provided)
            if (searchVal != null && !searchVal.isBlank()) {
                String likeSearch = "%" + searchVal.toLowerCase() + "%";
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), likeSearch),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), likeSearch)));
            }

            // Add tags predicate (if tags are provided)
            if (tags != null && !tags.isEmpty()) {
                predicates.add(root.join("tags").in(tags));
            }

            // Add price range predicate (if minPrice and/or maxPrice are provided)
            if (minPrice != null && maxPrice != null) {
                predicates.add(criteriaBuilder.between(root.get("price"), minPrice, maxPrice));
            } else if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            } else if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<Product> filterProductsByCategoryId(UUID categoryId, String searchVal,
            List<String> tags,
            BigDecimal minPrice,
            BigDecimal maxPrice) {
        return (Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            query.distinct(true);
            // Initialize predicates list
            List<Predicate> predicates = new ArrayList<>();

            // Add category predicate (categoryId is never null)
            predicates.add(criteriaBuilder.equal(root.get("category").get("id"), categoryId));

            // Add search predicate (if search term is provided)
            if (searchVal != null && !searchVal.isBlank()) {
                String likeSearch = "%" + searchVal.toLowerCase() + "%";
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), likeSearch),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), likeSearch)));
            }

            // Add tags predicate (if tags are provided)
            if (tags != null && !tags.isEmpty()) {
                predicates.add(root.join("tags").in(tags));
            }

            // Add price range predicate (if minPrice and/or maxPrice are provided)
            if (minPrice != null && maxPrice != null) {
                predicates.add(criteriaBuilder.between(root.get("price"), minPrice, maxPrice));
            } else if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            } else if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<Product> filterProductsByCategorySlug(String categorySlug, String searchVal,
            List<String> tags,
            BigDecimal minPrice,
            BigDecimal maxPrice) {
        return (Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            query.distinct(true);
            // Initialize predicates list
            List<Predicate> predicates = new ArrayList<>();

            // Add category predicate (categorySlug is never null)
            predicates.add(criteriaBuilder.equal(root.get("category").get("slug"), categorySlug));

            // Add search predicate (if search term is provided)
            if (searchVal != null && !searchVal.isBlank()) {
                String likeSearch = "%" + searchVal.toLowerCase() + "%";
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), likeSearch),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), likeSearch)));
            }

            // Add tags predicate (if tags are provided)
            if (tags != null && !tags.isEmpty()) {
                predicates.add(root.join("tags").in(tags));
            }

            // Add price range predicate (if minPrice and/or maxPrice are provided)
            if (minPrice != null && maxPrice != null) {
                predicates.add(criteriaBuilder.between(root.get("price"), minPrice, maxPrice));
            } else if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            } else if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
