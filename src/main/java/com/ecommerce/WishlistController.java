package com.ecommerce;

import com.ecommerce.model.WishlistItem;
import com.ecommerce.repository.WishlistItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistItemRepository wishlistItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<WishlistItem>> getWishlist(@PathVariable Long userId) {
        return ResponseEntity.ok(wishlistItemRepository.findByUserId(userId));
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<?> addToWishlist(@PathVariable Long userId, @RequestBody Map<String, Object> payload) {
        Long productId = Long.valueOf(payload.get("productId").toString());

        User user = userRepository.findById(userId).orElse(null);
        Product product = productRepository.findById(productId).orElse(null);

        if (user == null || product == null) {
            return ResponseEntity.badRequest().body("User or Product not found");
        }

        Optional<WishlistItem> existingItem = wishlistItemRepository.findByUserIdAndProductId(userId, productId);
        if (existingItem.isPresent()) {
            return ResponseEntity.ok("Item already in wishlist"); // Idempotent
        }

        WishlistItem newItem = new WishlistItem();
        newItem.setUser(user);
        newItem.setProduct(product);
        wishlistItemRepository.save(newItem);

        return ResponseEntity.ok(wishlistItemRepository.findByUserId(userId));
    }

    @Transactional
    @DeleteMapping("/{userId}/remove/{productId}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        wishlistItemRepository.deleteByUserIdAndProductId(userId, productId);
        return ResponseEntity.ok(wishlistItemRepository.findByUserId(userId));
    }
}
