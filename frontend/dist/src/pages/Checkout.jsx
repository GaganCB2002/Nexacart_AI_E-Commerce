import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Smartphone, Banknote, MapPin, User, Mail, Phone, Home } from 'lucide-react';
import { useEffect } from 'react';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        upiId: ''
    });

    const subtotal = getCartTotal();
    const shipping = subtotal > 5000 ? 0 : 100;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Generate order ID
        const orderId = 'ORD' + Date.now();

        // Store order details
        const orderDetails = {
            orderId,
            items: cartItems,
            total,
            paymentMethod,
            shippingAddress: {
                fullName: formData.fullName,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode
            },
            orderDate: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
        };

        localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
        clearCart();
        navigate(`/order-confirmation/${orderId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-40 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Checkout
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <MapPin className="mr-2" size={24} />
                                Shipping Address
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                                <input
                                    type="text"
                                    placeholder="PIN Code"
                                    required
                                    value={formData.pincode}
                                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    required
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="md:col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                                <input
                                    type="text"
                                    placeholder="City"
                                    required
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                                <input
                                    type="text"
                                    placeholder="State"
                                    required
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Payment Method
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={`p-4 border-2 rounded-lg transition-colors flex flex-col items-center justify-center ${paymentMethod === 'card'
                                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-700'
                                        }`}
                                >
                                    <CreditCard className="mb-2" size={24} />
                                    <span className="text-sm font-medium">Card</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('upi')}
                                    className={`p-4 border-2 rounded-lg transition-colors flex flex-col items-center justify-center ${paymentMethod === 'upi'
                                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-700'
                                        }`}
                                >
                                    <Smartphone className="mb-2" size={24} />
                                    <span className="text-sm font-medium">UPI</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('netbanking')}
                                    className={`p-4 border-2 rounded-lg transition-colors flex flex-col items-center justify-center ${paymentMethod === 'netbanking'
                                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-700'
                                        }`}
                                >
                                    <Home className="mb-2" size={24} />
                                    <span className="text-sm font-medium">Net Banking</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('cod')}
                                    className={`p-4 border-2 rounded-lg transition-colors flex flex-col items-center justify-center ${paymentMethod === 'cod'
                                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-700'
                                        }`}
                                >
                                    <Banknote className="mb-2" size={24} />
                                    <span className="text-sm font-medium">Cash on Delivery</span>
                                </button>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                        required
                                        value={formData.cardNumber}
                                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                        className="md:col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Cardholder Name"
                                        required
                                        value={formData.cardName}
                                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    />
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        required
                                        value={formData.expiryDate}
                                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        required
                                        maxLength="3"
                                        value={formData.cvv}
                                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    />
                                </div>
                            )}

                            {paymentMethod === 'upi' && (
                                <input
                                    type="text"
                                    placeholder="UPI ID (e.g., yourname@upi)"
                                    required
                                    value={formData.upiId}
                                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            )}

                            {paymentMethod === 'cod' && (
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                                    <p className="text-yellow-800 dark:text-yellow-200">
                                        Pay ₹{total.toFixed(2)} in cash when your order is delivered.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md sticky top-44">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Order Summary
                            </h2>

                            <div className="space-y-3 mb-6">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {item.name} x {item.quantity}
                                        </span>
                                        <span className="text-gray-900 dark:text-white font-medium">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 mb-6 pt-4 border-t border-gray-200 dark:border-gray-700">
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
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
