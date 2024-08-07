package com.project.digitalshop.model;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;

@Entity
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false, unique = true)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String reviewText;

    @Column(nullable = false)
    private float rating;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime reviewDate;

    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime modifiedOn;
}
