import { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from './ProductCard';
import { History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RecentViews = () => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchRecent = async () => {
            if (!user?.id) return;
            try {
                const res = await api.get(`/products/recent?userId=${user.id}`);
                // Endpoint returns List<RecentView>, map to Product
                setProducts(res.data.map(view => view.product));
            } catch (err) {
                console.error("Failed to load recent views");
            }
        };
        fetchRecent();
    }, [user]);

    if (!user || products.length === 0) return null;

    return (
        <section className="py-12 border-t border-slate-100">
            <div className="flex items-center space-x-2 mb-8">
                <History className="text-blue-500" size={28} />
                <h2 className="text-2xl font-bold text-slate-800">Recently Viewed</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product, idx) => (
                    <ProductCard key={`${product.id}-${idx}`} product={product} />
                ))}
            </div>
        </section>
    );
};

export default RecentViews;
