import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';

const FilterSidebar = ({ isOpen, onClose, currentFilters, onApply, categories }) => {
    // Local state for pending filters (not applied yet)
    const [pendingFilters, setPendingFilters] = useState(currentFilters);

    // Sync pending filters when official currentFilters change
    useEffect(() => {
        setPendingFilters(currentFilters);
    }, [currentFilters]);

    const handleApply = () => {
        onApply(pendingFilters);
    };

    return (
        <div className={`${isOpen ? 'block' : 'hidden'} lg:block w-64 flex-shrink-0 transition-all duration-300`}>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 sticky top-44 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                        <Filter size={20} className="mr-2" />
                        Filters
                    </h2>
                    <button
                        onClick={onClose}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Category</h3>
                    <select
                        value={pendingFilters.category}
                        onChange={(e) => setPendingFilters({ ...pendingFilters, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat === 'all' ? 'All Categories' : cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Price Range</h3>
                    <select
                        value={pendingFilters.priceRange}
                        onChange={(e) => setPendingFilters({ ...pendingFilters, priceRange: e.target.value, minPrice: null, maxPrice: null })}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                    >
                        <option value="all">All Prices</option>
                        <option value="under-1000">Under ₹1,000</option>
                        <option value="1000-5000">₹1,000 - ₹5,000</option>
                        <option value="5000-10000">₹5,000 - ₹10,000</option>
                        <option value="above-10000">Above ₹10,000</option>
                    </select>
                </div>

                {/* Sort By */}
                <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Sort By</h3>
                    <select
                        value={pendingFilters.sortBy}
                        onChange={(e) => setPendingFilters({ ...pendingFilters, sortBy: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                    >
                        <option value="relevance">Relevance</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name: A to Z</option>
                    </select>
                </div>

                {/* Apply Button */}
                <button
                    onClick={handleApply}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg active:scale-95 transform duration-150"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterSidebar;
