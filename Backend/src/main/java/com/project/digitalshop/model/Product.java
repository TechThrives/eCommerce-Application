package com.project.digitalshop.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Set;
import java.util.List;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false, unique = true)
    private UUID id;

    @Column(nullable = false)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_image_urls", joinColumns = @JoinColumn(name = "product_id"))
    private List<String> imageUrls;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String overview;

    @Column(nullable = false)
    private String shortDescription;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private BigDecimal originalPrice;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_tags", joinColumns = @JoinColumn(name = "product_id"))
    @Column(nullable = false)
    private Set<String> tags;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private float avgRating = 0.0f;

    @Column(nullable = false)
    private int reviewCount = 0;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @Column(nullable = false)
    private String downloadUrl;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime modifiedOn;

    public void incrementReviewCount() {
        this.reviewCount++;
    }

    public void decrementReviewCount() {
        this.reviewCount--;
    }
}
