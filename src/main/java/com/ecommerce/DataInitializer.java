package com.ecommerce;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Collections;
import java.util.HashMap;

@Configuration
public class DataInitializer {

        // Helper to create product with full details
        private Product createProduct(String name, String desc, double price, String img, String cat, String subcat,
                        String longDesc, Map<String, String> specs, List<String> extraImages) {
                Product p = new Product();
                p.setName(name);
                p.setDescription(desc);
                p.setPrice(price);
                p.setImageUrl(img);
                p.setCategory(cat);
                p.setSubcategory(subcat);
                p.setLongDescription(longDesc);
                p.setSpecifications(specs);
                p.setImages(extraImages != null ? extraImages : Arrays.asList(img));
                p.setStockQuantity((int) (Math.random() * 100) + 10);
                p.setSellerId(2L); // Default seller
                p.setCreatedAt(LocalDateTime.now());
                return p;
        }

        @Bean
        public CommandLineRunner initData(UserRepository userRepository,
                        ProductRepository productRepository,
                        PriceHistoryRepository priceHistoryRepository,
                        PasswordEncoder passwordEncoder) {
                return args -> {
                        // Seed Users
                        if (userRepository.count() == 0) {
                                User admin = new User();
                                admin.setUsername("admin");
                                admin.setEmail("admin@example.com");
                                admin.setPassword(passwordEncoder.encode("admin123"));
                                admin.setRole("ADMIN");
                                admin.setCreatedAt(LocalDateTime.now());

                                User seller = new User();
                                seller.setUsername("seller");
                                seller.setEmail("seller@example.com");
                                seller.setPassword(passwordEncoder.encode("seller123"));
                                seller.setRole("SELLER");
                                seller.setCreatedAt(LocalDateTime.now());

                                User buyer = new User();
                                buyer.setUsername("buyer");
                                buyer.setEmail("buyer@example.com");
                                buyer.setPassword(passwordEncoder.encode("buyer123"));
                                buyer.setRole("BUYER");
                                buyer.setCreatedAt(LocalDateTime.now());

                                userRepository.saveAll(Arrays.asList(admin, seller, buyer));
                        }

                        // Seed Products
                        if (productRepository.count() == 0) {
                                List<Product> products = new ArrayList<>();

                                // --- Electronics ---
                                // Mobiles
                                Map<String, String> mobileSpecs = new HashMap<>();
                                mobileSpecs.put("screen", "6.7 inch OLED");
                                mobileSpecs.put("processor", "High-End Chip");
                                mobileSpecs.put("battery", "5000 mAh");

                                products.add(createProduct("Apple iPhone 15 Pro Max", "Titanium design, A17 Pro chip.",
                                                159900.0,
                                                "https://picsum.photos/seed/iphone15/400/400", "Electronics", "Mobiles",
                                                "The iPhone 15 Pro Max features a strong and lightweight titanium design with new contoured edges...",
                                                mobileSpecs,
                                                Arrays.asList("https://picsum.photos/seed/iphone15_1/400/400",
                                                                "https://picsum.photos/seed/iphone15_2/400/400")));

                                products.add(createProduct("Samsung Galaxy S24 Ultra", "Galaxy AI is here.", 129999.0,
                                                "https://picsum.photos/seed/s24/400/400", "Electronics", "Mobiles",
                                                "Meet the Galaxy S24 Ultra, with a durable shield of titanium built right into the frame...",
                                                mobileSpecs, null));

                                products.add(createProduct("Google Pixel 8 Pro", "The most pro Pixel yet.", 106999.0,
                                                "https://picsum.photos/seed/pixel8/400/400", "Electronics", "Mobiles",
                                                "Pixel 8 Pro is the all-pro phone engineered by Google. It's sleek, sophisticated...",
                                                mobileSpecs, null));

                                // Laptops
                                Map<String, String> laptopSpecs = new HashMap<>();
                                laptopSpecs.put("ram", "16GB Unified");
                                laptopSpecs.put("storage", "512GB SSD");
                                laptopSpecs.put("screen", "14.2 Liquid Retina XDR");

                                products.add(createProduct("MacBook Pro M3", "Mind-blowing. Head-turning.", 169900.0,
                                                "https://picsum.photos/seed/macm3/400/400", "Electronics", "Laptops",
                                                "The MacBook Pro blasts forward with the M3, M3 Pro, and M3 Max chips...",
                                                laptopSpecs, null));

                                products.add(createProduct("Dell XPS 15", "Immersive display. Premium design.",
                                                195000.0,
                                                "https://picsum.photos/seed/xps15/400/400", "Electronics", "Laptops",
                                                "Experience the world's smallest 15.6-inch performance laptop...",
                                                laptopSpecs, null));

                                // Cameras
                                products.add(createProduct("Canon EOS R6 Mark II", "Master stills and motion.",
                                                215000.0,
                                                "https://picsum.photos/seed/canonr6/400/400", "Electronics", "Cameras",
                                                "The EOS R6 Mark II is a versatile mirrorless camera for the multimedia creator...",
                                                Collections.singletonMap("sensor", "24.2MP CMOS"), null));

                                // --- Fashion ---
                                // Men's Clothing
                                products.add(createProduct("Levi's Men's 511 Slim Jeans", "Modern slim-fit jeans.",
                                                2999.0,
                                                "https://picsum.photos/seed/levis511/400/400", "Fashion",
                                                "Men's Clothing",
                                                "A modern slim with room to move, the 511 Slim Jeans are a classic since right now...",
                                                Collections.singletonMap("material", "99% Cotton"), null));

                                products.add(createProduct("Nike Sportswear T-Shirt", "Classic comfort.", 1595.0,
                                                "https://picsum.photos/seed/niketee/400/400", "Fashion",
                                                "Men's Clothing",
                                                "The Nike Sportswear T-Shirt sets you up with soft cotton jersey...",
                                                Collections.singletonMap("fit", "Standard"), null));

                                // Women's Clothing
                                products.add(createProduct("Zara Floral Midi Dress", "Elegant floral print.", 4590.0,
                                                "https://picsum.photos/seed/zaradress/400/400", "Fashion",
                                                "Women's Clothing",
                                                "Midi dress made of flowing fabric. V-neck with tie...",
                                                Collections.singletonMap("material", "Viscose"), null));

                                // Accessories
                                products.add(createProduct("Ray-Ban Aviator", "Classic style.", 8500.0,
                                                "https://picsum.photos/seed/rayban/400/400", "Fashion", "Accessories",
                                                "Currently one of the most iconic sunglass models in the world...",
                                                Collections.singletonMap("lens", "G-15 Green"), null));

                                // --- Home & Kitchen ---
                                // Furniture
                                products.add(createProduct("IKEA KIVIK Sofa", "Cuddle up.", 45000.0,
                                                "https://picsum.photos/seed/kivik/400/400", "Home & Kitchen",
                                                "Furniture",
                                                "KIVIK is a generous seating series with a soft, deep seat and comfortable support...",
                                                Collections.singletonMap("color", "Hillared Dark Blue"), null));

                                // Appliances
                                products.add(createProduct("Philips Air Fryer HD9200",
                                                "Great tasting fries with up to 90% less fat.", 7999.0,
                                                "https://picsum.photos/seed/philipsfry/400/400", "Home & Kitchen",
                                                "Appliances",
                                                "Philips brings you the World's No.1 Airfryer to everyone’s home...",
                                                Collections.singletonMap("capacity", "4.1L"), null));

                                // --- Beauty & Personal Care ---
                                products.add(createProduct("Lakmé Absolute Lipstick", "Matte finish.", 850.0,
                                                "https://picsum.photos/seed/lakme/400/400", "Beauty & Personal Care",
                                                "Makeup",
                                                "Sculpt your lips with the Lakmé Absolute Sculpt Matte Lipstick...",
                                                Collections.singletonMap("finish", "Matte"), null));

                                products.add(createProduct("Nivea Men Facewash", "Deep cleaning.", 250.0,
                                                "https://picsum.photos/seed/nivea/400/400", "Beauty & Personal Care",
                                                "Skincare",
                                                "NIVEA MEN Dark Spot Reduction Face Wash reduces dark spots...",
                                                Collections.singletonMap("type", "Face Wash"), null));

                                // --- Sports & Outdoors ---
                                products.add(createProduct("Yonex Muscle Power Badminton Racket",
                                                "High repulsion power.", 1999.0,
                                                "https://picsum.photos/seed/yonex/400/400", "Sports & Outdoors",
                                                "Badminton",
                                                "Muscle Power locates the string on rounded archways that eliminate stress-load...",
                                                Collections.singletonMap("weight", "3U (85-89g)"), null));

                                products.add(createProduct("Decathlon Quechua Tent", "2 Person Camping Tent.", 3999.0,
                                                "https://picsum.photos/seed/tent/400/400", "Sports & Outdoors",
                                                "Camping",
                                                "Designed for 2 people camping who want a simple tent that's easy to pitch...",
                                                Collections.singletonMap("capacity", "2 People"), null));

                                // Add more generics to fill space
                                for (int i = 0; i < 50; i++) {
                                        products.add(createProduct("Generic Item " + i, "Standard generic item.", 999.0,
                                                        "https://picsum.photos/seed/gen" + i + "/400/400", "General",
                                                        "Others",
                                                        "This is a generic placeholder item for testing layout.",
                                                        Collections.singletonMap("type", "Generic"), null));
                                }

                                productRepository.saveAll(products);

                                // Seed Price History for first product
                                if (!products.isEmpty()) {
                                        Product firstProduct = products.get(0);
                                        PriceHistory ph1 = new PriceHistory(null, firstProduct,
                                                        firstProduct.getPrice() * 0.95,
                                                        LocalDateTime.now().minusDays(90));
                                        PriceHistory ph2 = new PriceHistory(null, firstProduct,
                                                        firstProduct.getPrice() * 0.98,
                                                        LocalDateTime.now().minusDays(60));
                                        PriceHistory ph3 = new PriceHistory(null, firstProduct, firstProduct.getPrice(),
                                                        LocalDateTime.now().minusDays(30));
                                        priceHistoryRepository.saveAll(Arrays.asList(ph1, ph2, ph3));
                                }
                        }
                };
        }
}
