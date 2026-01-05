package com.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @org.springframework.context.annotation.Bean
    public org.springframework.boot.CommandLineRunner demo(UserRepository repository) {
        return (args) -> {
            if (!repository.existsByEmail("demo@nebula.com")) {
                User user = new User();
                user.setUsername("CosmicTraveler");
                user.setEmail("demo@nebula.com");
                user.setPassword("Demo1234"); // Authenticated
                user.setRole("BUYER");
                repository.save(user);
                System.out.println("Demo User Created: demo@nebula.com / Demo1234");
            }
        };
    }

}
