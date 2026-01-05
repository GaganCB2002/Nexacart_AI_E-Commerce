import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Package, MapPin, Truck, CheckCircle, Clock } from 'lucide-react';

const TrackOrder = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [trackingSteps, setTrackingSteps] = useState([
        { id: 1, status: 'Order Placed', location: 'NexaCart Warehouse', completed: true, timestamp: new Date() },
        { id: 2, status: 'Processing', location: 'Packaging Center, Mumbai', completed: true, timestamp: new Date(Date.now() + 2 * 60 * 60 * 1000) },
        { id: 3, status: 'Shipped', location: 'In Transit to Delhi Hub', completed: false, timestamp: new Date(Date.now() + 24 * 60 * 60 * 1000) },
        { id: 4, status: 'Out for Delivery', location: 'Local Delivery Center', completed: false, timestamp: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) },
        { id: 5, status: 'Delivered', location: 'Your Doorstep', completed: false, timestamp: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) }
    ]);
    const [currentStep, setCurrentStep] = useState(2);

    useEffect(() => {
        const savedOrder = localStorage.getItem('lastOrder');
        if (savedOrder) {
            setOrderDetails(JSON.parse(savedOrder));
        }

        // Simulate real-time tracking updates
        const interval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < 5) {
                    const newStep = prev + 1;
                    setTrackingSteps(steps => steps.map((step, idx) => ({
                        ...step,
                        completed: idx < newStep
                    })));
                    return newStep;
                }
                return prev;
            });
        }, 10000); // Update every 10 seconds for demo

        return () => clearInterval(interval);
    }, []);

    if (!orderDetails) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black pt-40 pb-12 flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400">Loading tracking information...</p>
            </div>
        );
    }

    const currentLocation = trackingSteps[currentStep - 1];
    const estimatedDelivery = new Date(orderDetails.estimatedDelivery);
    const timeRemaining = Math.max(0, Math.ceil((estimatedDelivery - new Date()) / (1000 * 60 * 60))); // hours

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-40 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Track Your Order
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Order ID</p>
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                {orderDetails.orderId}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Current Status</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                {currentLocation.status}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Delivery</p>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                {timeRemaining}h remaining
                            </p>
                        </div>
                    </div>
                </div>

                {/* Live Location */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-lg p-6 shadow-md mb-8 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold flex items-center">
                            <MapPin className="mr-2" size={24} />
                            Current Location
                        </h2>
                        <div className="animate-pulse flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm">Live Tracking</span>
                        </div>
                    </div>
                    <p className="text-2xl font-bold mb-2">{currentLocation.location}</p>
                    <p className="text-sm opacity-90">
                        Last updated: {currentLocation.timestamp.toLocaleTimeString('en-IN')}
                    </p>
                </div>

                {/* Tracking Timeline */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Tracking History
                    </h2>
                    <div className="space-y-6">
                        {trackingSteps.map((step, index) => (
                            <div key={step.id} className="relative flex items-start">
                                {/* Timeline Line */}
                                {index < trackingSteps.length - 1 && (
                                    <div className={`absolute left-4 top-10 w-0.5 h-full ${step.completed ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                                        }`}></div>
                                )}

                                {/* Icon */}
                                <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${step.completed
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                    }`}>
                                    {step.completed ? (
                                        <CheckCircle size={16} />
                                    ) : (
                                        <Clock size={16} />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="ml-4 flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`font-semibold ${step.completed
                                            ? 'text-gray-900 dark:text-white'
                                            : 'text-gray-500 dark:text-gray-400'
                                            }`}>
                                            {step.status}
                                        </h3>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {step.timestamp.toLocaleDateString('en-IN', {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center">
                                        <MapPin size={14} className="mr-1" />
                                        {step.location}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Items in this Order */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md mt-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Package className="mr-2" size={24} />
                        Items in this Order
                    </h2>
                    <div className="space-y-4">
                        {orderDetails.items && orderDetails.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                                <img
                                    src={item.imageUrl || item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150"}
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
                </div>

                {/* Delivery Address */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md mt-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Truck className="mr-2" size={24} />
                        Delivery Address
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
            </div>
        </div>
    );
};

export default TrackOrder;
