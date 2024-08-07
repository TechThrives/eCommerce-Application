package com.project.digitalshop.repository;

import com.project.digitalshop.model.Product;
import com.project.digitalshop.model.Review;
import com.project.digitalshop.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID> {
    Page<Review> findAll(Pageable pageable);

    Page<Review> findByProduct(Product product, Pageable pageable);

    Page<Review> findByUser(User user, Pageable pageable);
}
