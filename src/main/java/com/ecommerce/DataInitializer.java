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

                        // CLEAR OLD DATA (To fix image mismatch issues)
                        priceHistoryRepository.deleteAll();
                        productRepository.deleteAll();

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
                                                "https://images.unsplash.com/photo-1695048180490-30026252922c?w=500", // Real
                                                                                                                      // iPhone
                                                                                                                      // 15
                                                                                                                      // Image
                                                "Electronics", "Mobiles",
                                                "The iPhone 15 Pro Max features a strong and lightweight titanium design with new contoured edges...",
                                                mobileSpecs,
                                                Arrays.asList("https://images.unsplash.com/photo-1695048180490-30026252922c?w=500",
                                                                "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500",
                                                                "https://images.unsplash.com/photo-1510166089176-b57564a542b1?w=500",
                                                                "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500",
                                                                "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=500")));

                                products.add(createProduct("Samsung Galaxy S24 Ultra", "Galaxy AI is here.", 129999.0,
                                                "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500", // Android/Samsung
                                                                                                                      // style
                                                "Electronics", "Mobiles",
                                                "Meet the Galaxy S24 Ultra, with a durable shield of titanium built right into the frame...",
                                                mobileSpecs,
                                                Arrays.asList("https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
                                                                "https://images.unsplash.com/photo-1557825835-b8160067e01d?w=500",
                                                                "https://images.unsplash.com/photo-1678911820864-e2c727c0c177?w=500",
                                                                "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500",
                                                                "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500")));

                                products.add(createProduct("Google Pixel 8 Pro", "The most pro Pixel yet.", 106999.0,
                                                "https://images.unsplash.com/photo-1598327105666-5b89351aff23?w=500", // Pixel
                                                                                                                      // style
                                                "Electronics", "Mobiles",
                                                "Pixel 8 Pro is the all-pro phone engineered by Google. It's sleek, sophisticated...",
                                                mobileSpecs,
                                                Arrays.asList("https://images.unsplash.com/photo-1598327105666-5b89351aff23?w=500",
                                                                "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500",
                                                                "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500",
                                                                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
                                                                "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500")));

                                // Laptops
                                Map<String, String> laptopSpecs = new HashMap<>();
                                laptopSpecs.put("ram", "16GB Unified");
                                laptopSpecs.put("storage", "512GB SSD");
                                laptopSpecs.put("screen", "14.2 Liquid Retina XDR");

                                products.add(createProduct("MacBook Pro M3", "Mind-blowing. Head-turning.", 169900.0,
                                                "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=500", // MacBook
                                                "Electronics", "Laptops",
                                                "The MacBook Pro blasts forward with the M3, M3 Pro, and M3 Max chips...",
                                                laptopSpecs,
                                                Arrays.asList("https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=500",
                                                                "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500",
                                                                "https://images.unsplash.com/photo-1531297425971-ec15337966f9?w=500",
                                                                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
                                                                "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500")));

                                products.add(createProduct("Dell XPS 15", "Immersive display. Premium design.",
                                                195000.0,
                                                "https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=500", // Dell/Laptop
                                                "Electronics", "Laptops",
                                                "Experience the world's smallest 15.6-inch performance laptop...",
                                                laptopSpecs,
                                                Arrays.asList("https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=500",
                                                                "https://images.unsplash.com/photo-1588872657578-a3d2bf224b64?w=500",
                                                                "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
                                                                "https://images.unsplash.com/photo-1618424181497-157f2c908584?w=500",
                                                                "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=500")));

                                // Cameras
                                products.add(createProduct("Canon EOS R6 Mark II", "Master stills and motion.",
                                                215000.0,
                                                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500", // Camera
                                                "Electronics", "Cameras",
                                                "The EOS R6 Mark II is a versatile mirrorless camera for the multimedia creator...",
                                                Collections.singletonMap("sensor", "24.2MP CMOS"),
                                                Arrays.asList("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
                                                                "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=500",
                                                                "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?w=500",
                                                                "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=500",
                                                                "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?w=500")));

                                // --- Fashion ---
                                // Men's Clothing
                                products.add(createProduct("Levi's Men's 511 Slim Jeans", "Modern slim-fit jeans.",
                                                2999.0,
                                                "https://images.unsplash.com/photo-1542272617-08f08630329e?w=500", // Jeans
                                                "Fashion",
                                                "Men's Clothing",
                                                "A modern slim with room to move, the 511 Slim Jeans are a classic since right now...",
                                                Collections.singletonMap("material", "99% Cotton"),
                                                Arrays.asList("https://images.unsplash.com/photo-1542272617-08f08630329e?w=500",
                                                                "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
                                                                "https://images.unsplash.com/photo-1604176354204-9268737828c4?w=500",
                                                                "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500",
                                                                "https://images.unsplash.com/photo-1584370848010-d7d63776a40e?w=500")));

                                products.add(createProduct("Nike Sportswear T-Shirt", "Classic comfort.", 1595.0,
                                                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", // T-Shirt
                                                "Fashion",
                                                "Men's Clothing",
                                                "The Nike Sportswear T-Shirt sets you up with soft cotton jersey...",
                                                Collections.singletonMap("fit", "Standard"),
                                                Arrays.asList("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
                                                                "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500",
                                                                "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
                                                                "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
                                                                "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500")));

                                // Women's Clothing
                                products.add(createProduct("Zara Floral Midi Dress", "Elegant floral print.", 4590.0,
                                                "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500", // Dress
                                                "Fashion",
                                                "Women's Clothing",
                                                "Midi dress made of flowing fabric. V-neck with tie...",
                                                Collections.singletonMap("material", "Viscose"),
                                                Arrays.asList("https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
                                                                "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
                                                                "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
                                                                "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500",
                                                                "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500")));

                                // Accessories
                                products.add(createProduct("Ray-Ban Aviator", "Classic style.", 8500.0,
                                                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", // Sunglasses
                                                "Fashion", "Accessories",
                                                "Currently one of the most iconic sunglass models in the world...",
                                                Collections.singletonMap("lens", "G-15 Green"),
                                                Arrays.asList("https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
                                                                "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
                                                                "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500",
                                                                "https://images.unsplash.com/photo-1625591348697-152e0050d28d?w=500",
                                                                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500")));

                                // --- Home & Kitchen ---
                                // Furniture
                                products.add(createProduct("IKEA KIVIK Sofa", "Cuddle up.", 45000.0,
                                                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500", // Sofa
                                                "Home & Kitchen",
                                                "Furniture",
                                                "KIVIK is a generous seating series with a soft, deep seat and comfortable support...",
                                                Collections.singletonMap("color", "Hillared Dark Blue"),
                                                Arrays.asList("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
                                                                "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500",
                                                                "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500",
                                                                "https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=500",
                                                                "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500")));

                                // Appliances
                                products.add(createProduct("Philips Air Fryer HD9200",
                                                "Great tasting fries with up to 90% less fat.", 7999.0,
                                                "https://images.unsplash.com/photo-1585672004077-9a4891129b4b?w=500", // Air
                                                                                                                      // Fryer
                                                                                                                      // ish,
                                                                                                                      // or
                                                                                                                      // Appliance
                                                "Home & Kitchen",
                                                "Appliances",
                                                "Philips brings you the World's No.1 Airfryer to everyone’s home...",
                                                Collections.singletonMap("capacity", "4.1L"),
                                                Arrays.asList("https://images.unsplash.com/photo-1585672004077-9a4891129b4b?w=500", // Using
                                                                                                                                    // general
                                                                                                                                    // kitchen
                                                                                                                                    // appliance
                                                                                                                                    // images
                                                                "https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=500",
                                                                "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500",
                                                                "https://images.unsplash.com/photo-1556911220-e6da7bb29c4f?w=500",
                                                                "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=500")));

                                // --- Beauty & Personal Care ---
                                products.add(createProduct("Lakmé Absolute Lipstick", "Matte finish.", 850.0,
                                                "https://images.unsplash.com/photo-1586495777744-4413f21062dc?w=500", // Lipstick
                                                "Beauty & Personal Care",
                                                "Makeup",
                                                "Sculpt your lips with the Lakmé Absolute Sculpt Matte Lipstick...",
                                                Collections.singletonMap("finish", "Matte"),
                                                Arrays.asList("https://images.unsplash.com/photo-1586495777744-4413f21062dc?w=500",
                                                                "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?w=500",
                                                                "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500",
                                                                "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=500",
                                                                "https://images.unsplash.com/photo-1591360236480-9495d4d380e2?w=500")));

                                products.add(createProduct("Nivea Men Facewash", "Deep cleaning.", 250.0,
                                                "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=500", // Facewash/Skincare
                                                "Beauty & Personal Care",
                                                "Skincare",
                                                "NIVEA MEN Dark Spot Reduction Face Wash reduces dark spots...",
                                                Collections.singletonMap("type", "Face Wash"),
                                                Arrays.asList("https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=500",
                                                                "https://images.unsplash.com/photo-1556228720-6d0dc35e1659?w=500",
                                                                "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500",
                                                                "https://images.unsplash.com/photo-1629198759645-d978a63200b2?w=500",
                                                                "https://images.unsplash.com/photo-1612817288484-96916a0816a0?w=500")));

                                // --- Sports & Outdoors ---
                                products.add(createProduct("Yonex Muscle Power Badminton Racket",
                                                "High repulsion power.", 1999.0,
                                                "https://images.unsplash.com/photo-1626224583764-84786c713064?w=500", // Racket
                                                "Sports & Outdoors",
                                                "Badminton",
                                                "Muscle Power locates the string on rounded archways that eliminate stress-load...",
                                                Collections.singletonMap("weight", "3U (85-89g)"),
                                                Arrays.asList("https://images.unsplash.com/photo-1626224583764-84786c713064?w=500",
                                                                "https://images.unsplash.com/photo-1613919113640-1375c7094d2d?w=500",
                                                                "https://images.unsplash.com/photo-1560942738-958cd2e742ac?w=500",
                                                                "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=500",
                                                                "https://images.unsplash.com/photo-1610420079979-373f7386d426?w=500")));

                                products.add(createProduct("Decathlon Quechua Tent", "2 Person Camping Tent.", 3999.0,
                                                "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500", // Tent
                                                "Sports & Outdoors",
                                                "Camping",
                                                "Designed for 2 people camping who want a simple tent that's easy to pitch...",
                                                Collections.singletonMap("capacity", "2 People"),
                                                Arrays.asList("https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500",
                                                                "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=500",
                                                                "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500",
                                                                "https://images.unsplash.com/photo-1496545672479-7ac372c09e85?w=500",
                                                                "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=500")));

                                // Add more generics to fill space
                                for (int i = 0; i < 50; i++) {
                                        products.add(createProduct("Generic Item " + i, "Standard generic item.", 999.0,
                                                        "https://picsum.photos/seed/gen" + i + "/400/400", "General",
                                                        "Others",
                                                        "This is a generic placeholder item for testing layout.",
                                                        Collections.singletonMap("type", "Generic"),
                                                        Arrays.asList("https://picsum.photos/seed/gen" + i
                                                                        + "/400/400")));
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
