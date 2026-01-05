import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart: removeItem, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');

    const subtotal = getCartTotal();
    const shipping = subtotal > 5000 ? 0 : 100;
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + shipping + tax;

    const handleCheckout = () => {
        if (!user) {
            alert("You must be logged in to place an order!");
            navigate('/login');
            return;
        }
        if (cartItems.length > 0) {
            navigate('/checkout');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-40 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                    <ShoppingBag className="mr-3" size={32} />
                    Shopping Cart ({cartItems.length} items)
                </h1>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="bg-white dark:bg-gray-900 rounded-lg p-6 flex items-center gap-6 shadow-md">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                            {item.description}
                                        </p>
                                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                            ₹{item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="text-lg font-semibold text-gray-900 dark:text-white w-8 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all shadow-sm"
                                        title="Remove Item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 sticky top-44 shadow-md">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    Order Summary
                                </h2>

                                {/* Promo Code */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Promo Code
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Enter code"
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                        />
                                        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                            Apply
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                                            {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Tax (GST 18%)</span>
                                        <span>₹{tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                                        <span>Total</span>
                                        <span>₹{total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center space-x-2"
                                >
                                    <span>Proceed to Checkout</span>
                                    <ArrowRight size={20} />
                                </button>

                                <a
                                    href="/"
                                    className="block text-center mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    Continue Shopping
                                </a>

                                {shipping > 0 && (
                                    <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
                                        Add ₹{(5000 - subtotal).toFixed(2)} more for FREE shipping!
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <ShoppingBag size={64} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Add items to get started
                        </p>
                        <a
                            href="/"
                            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Start Shopping
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
