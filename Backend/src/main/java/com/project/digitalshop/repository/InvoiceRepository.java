package com.project.digitalshop.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.digitalshop.model.Invoice;
import com.project.digitalshop.model.Product;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {
    Page<Invoice> findAll(Pageable pageable);

    Page<Invoice> findAllByUserId(UUID userId, Pageable pageable);

    List<Invoice> findByProductsContains(Product product);

    Optional<Invoice> findBySessionId(String sessionId);
}
