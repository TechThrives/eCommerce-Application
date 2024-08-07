package com.project.digitalshop.repository;

import java.util.UUID;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.digitalshop.model.Product;
import com.project.digitalshop.model.Wishlist;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, UUID> {
    Optional<Wishlist> findByUserId(UUID userId);

    List<Wishlist> findByProductsContains(Product product);
}
