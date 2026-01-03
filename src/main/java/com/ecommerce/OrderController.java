package com.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
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

        orderRepository.save(order);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("transactionId", txId);
        response.put("message", "Payment processed successfully in the Nebula Network.");

        return response;
    }

    @GetMapping("/track/{transactionId}")
    public Map<String, Object> trackOrder(@PathVariable String transactionId) {
        Map<String, Object> response = new HashMap<>();
        Optional<Order> orderOpt = orderRepository.findByTransactionId(transactionId);

        if (orderOpt.isPresent()) {
            response.put("status", "FOUND");
            response.put("orderStatus", orderOpt.get().getStatus());
            response.put("amount", orderOpt.get().getTotalAmount());
        } else {
            response.put("status", "NOT_FOUND");
            response.put("message", "Transaction ID not found in this dimension.");
        }
        return response;
    }
}
