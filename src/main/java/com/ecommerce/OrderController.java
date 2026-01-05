package com.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.Optional;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/place")
    public Map<String, Object> placeOrder(@RequestBody OrderRequest orderRequest) {
        // Simulate processing delay
        try {
            Thread.sleep(1500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        String txId = UUID.randomUUID().toString();

        Order order = new Order();
        order.setTransactionId(txId);
        order.setTotalAmount(orderRequest.getTotalAmount());
        order.setPaymentMethod(orderRequest.getPaymentMethod());
        order.setStatus("PROCESSING - Preparing your holographic items");
        order.setOrderDate(LocalDateTime.now());

        // Link order to user if userId is provided
        if (orderRequest.getUserId() != null) {
            userRepository.findById(orderRequest.getUserId()).ifPresent(order::setUser);
        }

        orderRepository.save(order);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("transactionId", txId);
        response.put("message", "Payment processed successfully in the Nebula Network.");

        return response;
    }

    @GetMapping("/user/{userId}")
    public java.util.List<Order> getOrdersByUser(@PathVariable Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @GetMapping("/track/{transactionId}")
    public ResponseEntity<?> trackOrder(@PathVariable String transactionId) {
        Optional<Order> orderOpt = orderRepository.findByTransactionId(transactionId);

        if (orderOpt.isPresent()) {
            return ResponseEntity.ok(orderOpt.get());
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "NOT_FOUND");
            response.put("message", "Transaction ID not found in this dimension.");
            return ResponseEntity.status(404).body(response);
        }
    }
}
