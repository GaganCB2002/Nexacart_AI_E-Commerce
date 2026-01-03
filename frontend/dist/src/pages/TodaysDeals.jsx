import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../utils/mockData';
import { Tag, Clock } from 'lucide-react';
import api from '../services/api';

const TodaysDeals = () => {
    const [products, setProducts] = useState([]);
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

    useEffect(() => {
        // Fetch products
        api.get('/products')
            .then(res => {
                if (res.data && res.data.length > 0) {
                    // Filter products with prices under 10000 as "deals"
                    const deals = res.data.filter(p => p.price < 10000);
                    setProducts(deals);
                } else {
                    const deals = mockProducts.filter(p => p.price < 10000);
                    setProducts(deals);
                }
            })
            .catch(() => {
                const deals = mockProducts.filter(p => p.price < 10000);
                setProducts(deals);
            });

        // Countdown timer
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-40 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center">
                            <Tag className="mr-3 text-red-500" size={36} />
                            Today's Deals
                        </h1>
                        <div className="bg-red-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2">
                            <Clock size={20} />
                            <span className="font-bold text-lg">
                                {String(timeLeft.hours).padStart(2, '0')}:
                                {String(timeLeft.minutes).padStart(2, '0')}:
                                {String(timeLeft.seconds).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Limited time offers - Grab them before they're gone!
                    </p>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <div key={product.id} className="relative">
                                <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    DEAL
                                </div>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            No deals available at the moment. Check back soon!
                        </p>
                    </div>
                )}

                <div className="mt-12 text-center">
                    <Link
                        to="/"
                        className="inline-block px-8 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TodaysDeals;
