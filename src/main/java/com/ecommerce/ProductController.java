package com.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private PriceHistoryRepository priceHistoryRepository;

    @Autowired
    private RecentViewRepository recentViewRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @GetMapping("/top-selling")
    public List<Product> getTopSelling() {
        // Top 10 selling products
        return orderItemRepository.findTopSellingProducts(PageRequest.of(0, 10));
    }

    @GetMapping("/{id}/price-history")
    public List<PriceHistory> getPriceHistory(@PathVariable Long id) {
        return priceHistoryRepository.findByProductIdOrderByTimestampAsc(id);
    }

    @PostMapping("/{id}/view")
    public void recordView(@PathVariable Long id, @RequestParam Long userId) {
        Optional<Product> productOpt = productRepository.findById(id);
        Optional<User> userOpt = userRepository.findById(userId);

        if (productOpt.isPresent() && userOpt.isPresent()) {
            RecentView view = new RecentView();
            view.setProduct(productOpt.get());
            view.setUser(userOpt.get());
            view.setViewedAt(LocalDateTime.now());
            recentViewRepository.save(view);
        }
    }

    @GetMapping("/recent")
    public List<RecentView> getRecentViews(@RequestParam Long userId) {
        // Limit to recent 10 views
        List<RecentView> allViews = recentViewRepository.findByUserIdOrderByViewedAtDesc(userId);
        return allViews.stream().limit(10).toList();
    }
}
