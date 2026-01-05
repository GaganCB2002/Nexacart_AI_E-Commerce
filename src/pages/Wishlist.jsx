import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const Wishlist = () => {
    const { wishlist } = useWishlist();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-40 pb-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                        <Heart className="mr-3 text-pink-500 fill-pink-500" size={32} />
                        My Wishlist
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
                    </p>
                </div>

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlist.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <Heart size={64} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                            Your wishlist is empty
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Add items you love to your wishlist
                        </p>
                        <Link
                            to="/"
                            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                        >
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
