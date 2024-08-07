package com.project.digitalshop.model;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;

@Entity
@Data
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false, unique = true)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "wishlist_products", joinColumns = @JoinColumn(name = "wishlist_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> products;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime modifiedOn;

    public int getProductCount() {
        return this.products != null ? this.products.size() : 0;
    }
}
