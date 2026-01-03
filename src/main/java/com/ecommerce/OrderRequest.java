package com.ecommerce;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private List<String> items;
    private Double totalAmount;
    private String paymentMethod;
}
