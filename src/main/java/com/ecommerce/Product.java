package com.ecommerce;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String imageUrl; // Keep for backward compatibility/thumbnail

    @jakarta.persistence.ElementCollection
    private java.util.List<String> images;

    private String category;
    private String subcategory;

    @jakarta.persistence.Column(length = 2000)
    private String longDescription;

    @jakarta.persistence.ElementCollection
    private java.util.Map<String, String> specifications;

    private Integer stockQuantity;
    private Long sellerId; // Simplified for now, could be User relation
    private LocalDateTime createdAt = LocalDateTime.now();
}
