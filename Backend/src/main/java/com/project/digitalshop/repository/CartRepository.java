package com.project.digitalshop.repository;

import com.project.digitalshop.model.Cart;
import com.project.digitalshop.model.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartRepository extends JpaRepository<Cart, UUID> {
    Optional<Cart> findByUserId(UUID userId);

    List<Cart> findByProductsContains(Product product);
}
