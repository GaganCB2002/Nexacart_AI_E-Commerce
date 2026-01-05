import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingBag, Heart, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ReminderPopup = () => {
    const { user } = useAuth();
    const { getCartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Show popup if user logs in and has items
        if (user && (getCartCount() > 0 || wishlistCount > 0)) {
            // Using timeout to allow context to sync
            const timer = setTimeout(() => {
                setShow(true);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setShow(false);
        }
    }, [user, getCartCount(), wishlistCount]); // Re-evaluate when counts change or user logs in

    if (!show) return null;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    className="fixed bottom-6 left-6 z-50 max-w-sm w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg">Welcome back, {user.username}!</h3>
                            <p className="text-sm opacity-90">You have saved items waiting for you.</p>
                        </div>
                        <button
                            onClick={() => setShow(false)}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="p-4 space-y-4">
                        {getCartCount() > 0 && (
                            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-lg">
                                        <ShoppingBag size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{getCartCount()} items in Cart</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Ready to checkout?</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setShow(false); navigate('/cart'); }}
                                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg transition-colors"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        )}

                        {wishlistCount > 0 && (
                            <div className="flex items-center justify-between p-3 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-pink-100 dark:bg-pink-800 text-pink-600 dark:text-pink-300 rounded-lg">
                                        <Heart size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{wishlistCount} items in Wishlist</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Don't forget them!</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setShow(false); navigate('/wishlist'); }}
                                    className="p-2 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-800 rounded-lg transition-colors"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        )}

                        <button
                            onClick={() => setShow(false)}
                            className="w-full py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors text-sm"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ReminderPopup;
