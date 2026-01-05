import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../utils/mockData';
import { Award } from 'lucide-react';
import api from '../services/api';
import FilterSidebar from '../components/FilterSidebar';
import { useProductFiltering } from '../hooks/useProductFiltering';

const BestSellers = () => {
    const {
        products,
        filteredProducts,
        filters,
        handleApplyFilters,
        setProducts
    } = useProductFiltering([]);

    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        api.get('/products')
            .then(res => {
                if (res.data && res.data.length > 0) {
                    // Get first 16 products as "best sellers"
                    const bestSellers = res.data.slice(0, 16);
                    setProducts(bestSellers);
                } else {
                    setProducts(mockProducts);
                }
            })
            .catch(() => setProducts(mockProducts));
    }, [setProducts]);

    const categories = ['all', ...new Set(products.map(p => p.category))];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-40 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center mb-4">
                        <Award className="mr-3 text-purple-500" size={36} />
                        Best Sellers
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        {filteredProducts.length} top-rated and most purchased products
                    </p>
                </div>

                <div className="flex gap-8">
                    {/* Filter Sidebar */}
                    <FilterSidebar
                        isOpen={showFilters}
                        onClose={() => setShowFilters(false)}
                        currentFilters={filters}
                        onApply={handleApplyFilters}
                        categories={categories}
                    />

                    {/* Products Grid */}
                    <div className="flex-1">
                        <button
                            onClick={() => setShowFilters(true)}
                            className="lg:hidden mb-4 flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                        >
                            <span>Show Filters</span>
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="relative">
                                    <div className="absolute top-2 left-2 z-10 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        BESTSELLER
                                    </div>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 dark:text-gray-400">No products match your filters.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link
                        to="/"
                        className="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BestSellers;
