import { X, Sliders } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryModal = ({ isOpen, onClose }) => {
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { name: 'Electronics', icon: '💻', count: 20 },
        { name: 'Fashion', icon: '👕', count: 25 },
        { name: 'Home & Living', icon: '🏠', count: 25 },
        { name: 'Accessories', icon: '⌚', count: 20 },
        { name: 'Sports', icon: '⚽', count: 10 },
        { name: 'Beauty', icon: '💄', count: 15 },
        { name: 'Books', icon: '📚', count: 12 },
        { name: 'Toys', icon: '🧸', count: 8 },
        { name: 'Grocery', icon: '🛒', count: 18 },
        { name: 'Automotive', icon: '🚗', count: 10 }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl mx-4 max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Browse All Categories
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X size={24} className="text-gray-600 dark:text-gray-400" />
                    </button>
                </div>

                <div className="flex">
                    {/* Categories Sidebar */}
                    <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-4">
                            Categories
                        </h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedCategory === 'all'
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                <span className="mr-2">🌟</span>
                                All Categories
                            </button>
                            {categories.map((cat, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${selectedCategory === cat.name
                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    <span>
                                        <span className="mr-2">{cat.icon}</span>
                                        {cat.name}
                                    </span>
                                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                                        {cat.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filters Section */}
                    <div className="flex-1 p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                <Sliders size={20} className="mr-2" />
                                Filters
                            </h3>

                            {/* Price Range Filter */}
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                    Price Range
                                </label>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <span>₹{priceRange[0].toLocaleString()}</span>
                                        <span>₹{priceRange[1].toLocaleString()}</span>
                                    </div>

                                    {/* Min Price Slider */}
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                                            Minimum Price
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100000"
                                            step="1000"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                    </div>

                                    {/* Max Price Slider */}
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                                            Maximum Price
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100000"
                                            step="1000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                    </div>

                                    {/* Quick Price Ranges */}
                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        <button
                                            onClick={() => setPriceRange([0, 1000])}
                                            className="px-3 py-2 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                                        >
                                            Under ₹1,000
                                        </button>
                                        <button
                                            onClick={() => setPriceRange([1000, 5000])}
                                            className="px-3 py-2 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                                        >
                                            ₹1K - ₹5K
                                        </button>
                                        <button
                                            onClick={() => setPriceRange([5000, 10000])}
                                            className="px-3 py-2 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                                        >
                                            ₹5K - ₹10K
                                        </button>
                                        <button
                                            onClick={() => setPriceRange([10000, 100000])}
                                            className="px-3 py-2 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                                        >
                                            Above ₹10K
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <Link
                            to={`/search?category=${selectedCategory}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`}
                            onClick={onClose}
                            className="w-full block text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
                        >
                            Apply Filters & Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
