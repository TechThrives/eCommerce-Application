package com.project.digitalshop.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false, unique = true)
    private UUID id;

    @Column(nullable = false, updatable = false, unique = true)
    private String sessionId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "invoice_products", joinColumns = @JoinColumn(name = "invoice_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> products;

    @Column(nullable = false)
    private BigDecimal subTotal;

    @Column(nullable = false)
    private BigDecimal tax;

    @Column(nullable = false)
    private BigDecimal totalPrice;

    @Column(nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private PaymentMethod paymentMethod;

    @Column(nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private PaymentStatus paymentStatus;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;
}
