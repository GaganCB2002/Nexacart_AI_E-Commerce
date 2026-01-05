import { Link } from 'react-router-dom';
import TopSelling from '../components/TopSelling';
import PriceChart from '../components/PriceChart';
import RecentViews from '../components/RecentViews';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../utils/mockData';
import ModernHero from '../components/ModernHero';
import RatingCharts from '../components/RatingCharts';

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        api.get('/products')
            .then(res => {
                if (res.data && res.data.length > 0) setAllProducts(res.data);
                else setAllProducts(mockProducts);
            })
            .catch(err => {
                console.warn("Using mock data for Home");
                setAllProducts(mockProducts);
            });
    }, []);

    return (
        <div className="min-h-screen bg-transparent dark:bg-transparent transition-colors duration-300">
            {/* Modern Hero Section */}
            <ModernHero />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24 -mt-10 relative z-20">
                <div className="mb-12">
                    <PriceChart data={[{ timestamp: Date.now() - 1000000, price: 100 }, { timestamp: Date.now(), price: 105 }]} />
                </div>

                {/* Live Analytics Section */}
                <RatingCharts />

                <TopSelling />

                <section>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">Featured Collection</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {allProducts.slice(0, 8).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                <RecentViews />
            </div>
        </div>
    );
};

export default Home;
