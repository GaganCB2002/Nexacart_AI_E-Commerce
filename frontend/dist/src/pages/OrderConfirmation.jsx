import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin, Clock } from 'lucide-react';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const savedOrder = localStorage.getItem('lastOrder');
        if (savedOrder) {
            setOrderDetails(JSON.parse(savedOrder));
        }
    }, []);

    if (!orderDetails) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black pt-40 pb-12 flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400">Loading order details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-40 pb-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Success Message */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md text-center mb-8">
                    <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Thank you for your purchase. Your order has been confirmed.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 inline-block">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Order ID</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {orderDetails.orderId}
                        </p>
                    </div>
                </div>

                {/* Order Details */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Order Details
                    </h2>
                    <div className="space-y-4">
                        {orderDetails.items.map(item => (
                            <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                <p className="font-bold text-gray-900 dark:text-white">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                        <span>Total Paid</span>
                        <span>₹{orderDetails.total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <MapPin className="mr-2" size={24} />
                        Shipping Address
                    </h2>
                    <p className="text-gray-900 dark:text-white font-semibold">
                        {orderDetails.shippingAddress.fullName}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        {orderDetails.shippingAddress.address}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pincode}
                    </p>
                </div>

                {/* Delivery Info */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Truck className="mr-2" size={24} />
                        Delivery Information
                    </h2>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Clock size={20} />
                        <span>Estimated Delivery: {new Date(orderDetails.estimatedDelivery).toLocaleDateString('en-IN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to={`/track-order/${orderDetails.orderId}`}
                        className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center flex items-center justify-center space-x-2"
                    >
                        <Package size={20} />
                        <span>Track Order</span>
                    </Link>
                    <Link
                        to="/"
                        className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
