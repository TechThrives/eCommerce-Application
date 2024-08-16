package com.project.digitalshop.repository;

import com.project.digitalshop.model.Product;
import com.project.digitalshop.model.Review;
import com.project.digitalshop.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID> {
    Page<Review> findAll(Pageable pageable);

    Page<Review> findByProduct(Product product, Pageable pageable);

    Page<Review> findByUser(User user, Pageable pageable);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.id = :productId")
    Float findAverageRatingByProductId(@Param("productId") UUID productId);

    long countByProductId(UUID productId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.product.id = :productId AND r.rating >= :minRating AND r.rating < :maxRating")
    long countByProductIdAndRatingRange(@Param("productId") UUID productId, @Param("minRating") double minRating, @Param("maxRating") double maxRating);
}
