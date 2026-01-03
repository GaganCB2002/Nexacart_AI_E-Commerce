import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { mockProducts } from '../utils/mockData';
import { Filter, X } from 'lucide-react';
import api from '../services/api';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const initialCategory = searchParams.get('category') || 'all';
    const initialMinPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null;
    const initialMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    // Official filters (applied)
    const [filters, setFilters] = useState({
        category: initialCategory,
        priceRange: 'all',
        minPrice: initialMinPrice,
        maxPrice: initialMaxPrice,
        sortBy: 'relevance'
    });

    useEffect(() => {
        // Fetch all products
        api.get('/products')
            .then(res => {
                if (res.data && res.data.length > 0) setProducts(res.data);
                else setProducts(mockProducts);
            })
            .catch(() => setProducts(mockProducts));
    }, []);

    // Sync official filters when URL params change
    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            category: initialCategory,
            minPrice: initialMinPrice,
            maxPrice: initialMaxPrice
        }));
    }, [initialCategory, initialMinPrice, initialMaxPrice]);

    useEffect(() => {
        // Filter and search products
        let results = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

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
    }, [products, query, filters]);

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        setShowFilters(false);
    };

    const categories = ['all', ...new Set(products.map(p => p.category))];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-40 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {query ? `Search Results for "${query}"` : 'All Products'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {filteredProducts.length} products found
                    </p>
                </div>

                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <FilterSidebar
                        isOpen={showFilters}
                        onClose={() => setShowFilters(false)}
                        currentFilters={filters}
                        onApply={handleApplyFilters}
                        categories={categories}
                    />

                    {/* Products Grid */}

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setShowFilters(true)}
                            className="lg:hidden mb-4 flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                        >
                            <Filter size={18} />
                            <span>Show Filters</span>
                        </button>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    No products found matching your search.
                                </p>
                                <Link
                                    to="/"
                                    className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Browse All Products
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
