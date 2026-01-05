import { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from './ProductCard';
import { Trophy } from 'lucide-react';
import { mockProducts } from '../utils/mockData';



const TopSelling = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchTopSelling = async () => {
            try {
                const res = await api.get('/products/top-selling');
                if (res.data && res.data.length > 0) {
                    setProducts(res.data);
                } else {
                    throw new Error("No data");
                }
            } catch (err) {
                console.warn("Backend unavailable, using mock data for Top Selling");
                setProducts(mockProducts);
            }
        };
        fetchTopSelling();
    }, []);

    return (
        <section className="py-12">
            <div className="flex items-center space-x-2 mb-8 px-4">
                <Trophy className="text-yellow-400 drop-shadow-lg" size={28} />
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500">Top Selling Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default TopSelling;
