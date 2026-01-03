import { useState, useEffect } from 'react';
import { Package, ChevronRight, Star, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { generateInvoice } from '../utils/invoiceGenerator';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock Data for now - Replace with API call
    useEffect(() => {
        // Simulate API fetch
        setTimeout(() => {
            setOrders([
                {
                    id: 'OD123456789',
                    date: '2023-10-25',
                    status: 'Delivered',
                    total: 89999,
                    items: [
                        {
                            id: 1,
                            name: 'Sony WH-1000XM5 Wireless Headphones',
                            image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=150',
                            status: 'Delivered on Oct 28'
                        }
                    ]
                },
                {
                    id: 'OD987654321',
                    date: '2023-11-02',
                    status: 'Shipped',
                    total: 1299,
                    items: [
                        {
                            id: 2,
                            name: 'Logitech MX Master 3S Mouse',
                            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150',
                            status: 'Expected by Nov 05'
                        }
                    ]
                },
                {
                    id: 'OD456123789',
                    date: '2023-09-15',
                    status: 'Cancelled',
                    total: 499,
                    items: [
                        {
                            id: 3,
                            name: 'USB-C Cable (2m)',
                            image: 'https://images.unsplash.com/photo-1622646633634-114c02931448?w=150',
                            status: 'Cancelled'
                        }
                    ]
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Processing': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered': return <CheckCircle size={14} className="mr-1" />;
            case 'Shipped': return <Truck size={14} className="mr-1" />;
            case 'Processing': return <Clock size={14} className="mr-1" />;
            case 'Cancelled': return <XCircle size={14} className="mr-1" />;
            default: return <Package size={14} className="mr-1" />;
        }
    };

    if (loading) {
        return <div className="pt-24 text-center dark:text-white">Loading orders...</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <Package size={64} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No orders found</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Looks like you haven't placed any orders yet.</p>
                    <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-12 transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <Link to="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/profile" className="hover:text-blue-600">My Account</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 dark:text-white font-medium">My Orders</span>
                </div>

                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                            {/* Order Header */}
                            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex space-x-2 mb-2 sm:mb-0">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Order ID: <span className="font-mono text-gray-900 dark:text-white">{order.id}</span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-6">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row gap-6 mb-4 last:mb-0">
                                        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <Link to={`/product/${item.id}`} className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition-colors line-clamp-2">
                                                {item.name}
                                            </Link>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.status}</p>

                                            {order.status === 'Delivered' && (
                                                <div
                                                    onClick={() => alert("Rate & Review feature coming soon! Thank you for your feedback.")}
                                                    className="mt-3 flex items-center space-x-1 text-blue-600 cursor-pointer text-sm font-medium hover:underline"
                                                >
                                                    <Star size={14} />
                                                    <span>Rate & Review Product</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col space-y-2 min-w-[140px]">
                                            <Link
                                                to={`/track-order/${order.id}`}
                                                className="w-full text-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                            >
                                                Track Order
                                            </Link>
                                            <button
                                                onClick={() => generateInvoice(order)}
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                View Invoice
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
