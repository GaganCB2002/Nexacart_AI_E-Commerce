import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import PriceChart from '../components/PriceChart';
import RatingCharts from '../components/RatingCharts';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [product, setProduct] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [prodRes, histRes] = await Promise.all([
                    api.get(`/products/${id}`),
                    api.get(`/products/${id}/price-history`)
                ]);
                setProduct(prodRes.data);
                setHistory(histRes.data);

                // Record View
                if (user?.id) {
                    api.post(`/products/${id}/view`, null, { params: { userId: user.id } });
                }
            } catch (err) {
                console.error("Error loading product");
            }
        };
        loadData();
    }, [id, user]);

    const [selectedImage, setSelectedImage] = useState(null);

    if (!product) return <div className="pt-24 text-center dark:text-white">Loading...</div>;

    const mainImage = selectedImage || product.imageUrl || `https://source.unsplash.com/random/800x800?product=${product.id}`;

    const handleAddToCart = () => {
        addToCart(product);
        alert(`${product.name} added to cart!`);
    };

    const handleBuyNow = () => {
        addToCart(product);
        navigate('/cart');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black pt-24 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800 overflow-hidden lg:flex transition-colors duration-300">
                    {/* Image Gallery Section */}
                    <div className="lg:w-1/2 p-8 bg-white dark:bg-gray-900 lg:border-r border-slate-100 dark:border-gray-800 flex flex-col transition-colors duration-300">
                        <div className="relative flex-1 flex items-center justify-center mb-6">
                            <motion.img
                                key={mainImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                src={mainImage}
                                alt={product.name}
                                className="max-h-96 object-contain"
                            />
                        </div>
                        {/* Thumbnails */}
                        {product.images && product.images.length > 0 && (
                            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                                <img
                                    src={product.imageUrl}
                                    onClick={() => setSelectedImage(product.imageUrl)}
                                    className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-colors duration-300 ${mainImage === product.imageUrl ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}
                                    alt="Main"
                                />
                                {product.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        onClick={() => setSelectedImage(img)}
                                        className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-colors duration-300 ${mainImage === img ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}
                                        alt={`View ${idx}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="lg:w-1/2 p-8 lg:p-12 overflow-y-auto max-h-screen">
                        <div className="mb-2 text-sm text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">
                            {product.category} {product.subcategory ? `> ${product.subcategory}` : ''}
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{product.name}</h1>
                        <p className="text-slate-500 dark:text-gray-400 text-sm mb-6">Product ID: {product.id}</p>

                        <div className="flex items-center space-x-4 mb-6">
                            <span className="text-4xl font-bold text-slate-900 dark:text-white">₹{product.price?.toLocaleString()}</span>
                            {product.stockQuantity > 0 ? (
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-semibold px-2.5 py-0.5 rounded">In Stock</span>
                            ) : (
                                <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs font-semibold px-2.5 py-0.5 rounded">Out of Stock</span>
                            )}
                        </div>

                        <div className="flex space-x-4 mb-8">
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95"
                            >
                                Buy Now
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center space-x-2 active:scale-95"
                            >
                                <ShoppingCart size={20} />
                                <span>Add to Cart</span>
                            </button>
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`p-3 rounded-xl border-2 transition-all shadow-md active:scale-95 flex items-center justify-center ${isInWishlist(product?.id) ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-500' : 'border-gray-200 dark:border-gray-700 hover:border-pink-500 hover:text-pink-500'}`}
                                title={isInWishlist(product?.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                            >
                                <Heart size={24} className={isInWishlist(product?.id) ? "fill-current" : ""} />
                            </button>
                        </div>

                        <div className="prose prose-slate dark:prose-invert mb-8 max-w-none">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Description</h3>
                            <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                                {product.longDescription || product.description}
                            </p>
                        </div>

                        {product.specifications && Object.keys(product.specifications).length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Specifications</h3>
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                            {Object.entries(product.specifications).map(([key, value]) => (
                                                <tr key={key}>
                                                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400 capitalize bg-gray-50 dark:bg-gray-800 w-1/3">{key}</td>
                                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        <div className="bg-slate-50 dark:bg-gray-800 rounded-xl p-6 border border-slate-100 dark:border-gray-700 mt-8">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Price History</h3>
                            <PriceChart data={history} />
                        </div>

                        <RatingCharts />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
