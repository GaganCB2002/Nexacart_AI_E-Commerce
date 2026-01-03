import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [showNotification, setShowNotification] = useState(false);

    const handleProductClick = (e) => {
        // Don't navigate if clicking on buttons
        if (e.target.closest('button')) return;
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
    };

    const handleViewProduct = (e) => {
        e.stopPropagation();
        navigate(`/product/${product.id}`);
    };

    const handleWishlistClick = (e) => {
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card group flex flex-col cursor-pointer h-full"
            onClick={handleProductClick}
        >
            {/* Add to Cart Notification */}
            {showNotification && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce text-sm font-medium whitespace-nowrap">
                    Added to cart!
                </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-800 p-4 flex items-center justify-center">
                <img
                    src={product.imageUrl || (product.images && product.images.length > 0 ? product.images[0] : `https://picsum.photos/seed/${product.id}/400/500`)}
                    alt={product.name || 'Product Image'}
                    className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://picsum.photos/seed/${product.id}/400/500`;
                    }}
                />

                <button
                    onClick={handleWishlistClick}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm hover:bg-white dark:hover:bg-black transition-colors shadow-sm group/btn"
                >
                    <Heart
                        size={20}
                        className={`transition-colors ${isInWishlist(product.id) ? 'fill-pink-500 text-pink-500' : 'text-gray-600 dark:text-gray-300 group-hover/btn:text-pink-500'}`}
                    />
                </button>

                {/* Specs Preview Overlay on Hover - Flipkart Style */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                    <div className="absolute inset-x-0 bottom-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-gray-100 dark:border-gray-700 z-10">
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                            {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                                <li key={key} className="flex justify-between">
                                    <span className="font-medium capitalize text-gray-800 dark:text-gray-200">{key}:</span>
                                    <span className="truncate ml-2">{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 truncate" title={product.name}>
                    {product.name || 'Unnamed Product'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        ₹{product.price?.toLocaleString()}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg active:scale-95"
                    >
                        <ShoppingCart size={16} />
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
