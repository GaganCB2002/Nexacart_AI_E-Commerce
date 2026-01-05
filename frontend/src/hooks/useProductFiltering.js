import { useState, useEffect } from 'react';

export const useProductFiltering = (initialProducts = []) => {
    const [products, setProducts] = useState(initialProducts);
    const [filteredProducts, setFilteredProducts] = useState(initialProducts);
    const [filters, setFilters] = useState({
        category: 'all',
        priceRange: 'all',
        minPrice: null,
        maxPrice: null,
        sortBy: 'relevance'
    });

    useEffect(() => {
        setProducts(initialProducts);
    }, [initialProducts]);

    useEffect(() => {
        let results = [...products];

        // Apply category filter
        if (filters.category !== 'all') {
            results = results.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
        }

        // Apply price range filter
        if (filters.minPrice !== null && filters.maxPrice !== null) {
            results = results.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);
        } else if (filters.priceRange !== 'all') {
            const ranges = {
                'under-1000': [0, 1000],
                '1000-5000': [1000, 5000],
                '5000-10000': [5000, 10000],
                'above-10000': [10000, Infinity]
            };
            const [min, max] = ranges[filters.priceRange];
            results = results.filter(p => p.price >= min && p.price < max);
        }

        // Apply sorting
        if (filters.sortBy === 'price-low') {
            results.sort((a, b) => a.price - b.price);
        } else if (filters.sortBy === 'price-high') {
            results.sort((a, b) => b.price - a.price);
        } else if (filters.sortBy === 'name') {
            results.sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredProducts(results);
    }, [products, filters]);

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return {
        products,
        filteredProducts,
        filters,
        setFilters,
        handleApplyFilters,
        setProducts
    };
};
