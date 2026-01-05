package com.ecommerce;

import com.ecommerce.model.CartItem;
import com.ecommerce.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartItemRepository.findByUserId(userId));
    }

    @Transactional
    @PostMapping("/{userId}/add")
    public ResponseEntity<?> addToCart(@PathVariable Long userId, @RequestBody Map<String, Object> payload) {
        if (payload.get("productId") == null || payload.get("quantity") == null) {
            return ResponseEntity.badRequest().body("Missing productId or quantity");
        }

        try {
            Long productId = Long.valueOf(payload.get("productId").toString());
            int quantity = Integer.parseInt(payload.get("quantity").toString());

            User user = userRepository.findById(userId).orElse(null);
            Product product = productRepository.findById(productId).orElse(null);

            if (user == null || product == null) {
                return ResponseEntity.badRequest().body("User or Product not found");
            }

            Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndProductId(userId, productId);
            if (existingItem.isPresent()) {
                CartItem item = existingItem.get();
                item.setQuantity(item.getQuantity() + quantity);
                cartItemRepository.saveAndFlush(item);
            } else {
                CartItem newItem = new CartItem();
                newItem.setUser(user);
                newItem.setProduct(product);
                newItem.setQuantity(quantity);
                cartItemRepository.saveAndFlush(newItem);
            }

            // Force fetch fresh list
            return ResponseEntity.ok(cartItemRepository.findByUserId(userId));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid format for productId or quantity");
        }
    }

    @PutMapping("/{userId}/update")
    public ResponseEntity<?> updateQuantity(@PathVariable Long userId, @RequestBody Map<String, Object> payload) {
        Long productId = Long.valueOf(payload.get("productId").toString());
        int quantity = Integer.parseInt(payload.get("quantity").toString());

        Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndProductId(userId, productId);
        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            if (quantity <= 0) {
                cartItemRepository.delete(item);
            } else {
                item.setQuantity(quantity);
                cartItemRepository.save(item);
            }
            return ResponseEntity.ok(cartItemRepository.findByUserId(userId));
        }
        return ResponseEntity.badRequest().body("Item not found in cart");
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long userId, @PathVariable Long productId) {
        Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndProductId(userId, productId);
        if (existingItem.isPresent()) {
            cartItemRepository.delete(existingItem.get());
            return ResponseEntity.ok(cartItemRepository.findByUserId(userId));
        }
        return ResponseEntity.notFound().build();
    }

    @Transactional
    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<?> clearCart(@PathVariable Long userId) {
        cartItemRepository.deleteByUserId(userId);
        return ResponseEntity.ok().build();
    }
}
