package com.project.digitalshop.repository;

import com.project.digitalshop.model.Invoice;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {
    Page<Invoice> findAll(Pageable pageable);

    Page<Invoice> findAllByUserId(UUID userId, Pageable pageable);
}
