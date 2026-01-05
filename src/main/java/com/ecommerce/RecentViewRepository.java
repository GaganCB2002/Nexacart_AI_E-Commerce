package com.ecommerce;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecentViewRepository extends JpaRepository<RecentView, Long> {
    List<RecentView> findByUserIdOrderByViewedAtDesc(Long userId);
}
