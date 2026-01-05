import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingCart, User, LogOut, Search, Heart, Menu, ChevronDown, Package, MapPin, X, Phone, Mail, MessageCircle, Home, Gift, Briefcase, Download, Tag, TrendingUp, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';
import CategoryModal from './CategoryModal';
import GiftCardModal from './GiftCardModal';

const Navbar = ({ setIsChatOpen }) => {
    const { user, logout } = useAuth();
    const { getCartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showGiftCardModal, setShowGiftCardModal] = useState(false);
    const [showSupportModal, setShowSupportModal] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [locationName, setLocationName] = useState(() => {
        return localStorage.getItem('userLocation') || 'Your Location';
    });
    const [isLocating, setIsLocating] = useState(false);

    const handleLocationClick = () => {
        if (!user) {
            alert("Please login to set your delivery location.");
            navigate('/login');
            return;
        }

        if (isLocating) return;

        if (!("geolocation" in navigator)) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // Using OpenStreetMap Nominatim API for free reverse geocoding
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();

                    const city = data.address.city || data.address.town || data.address.village || data.address.suburb;
                    const postcode = data.address.postcode;
                    const formattedLocation = `${city}${postcode ? ` - ${postcode}` : ''}`;

                    setLocationName(formattedLocation);
                    localStorage.setItem('userLocation', formattedLocation);
                    alert(`Location detected: ${formattedLocation}`);
                } catch (error) {
                    console.error("Error fetching address:", error);
                    alert("Unable to retrieve address details. Using coordinates.");
                    setLocationName(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                setIsLocating(false);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                        break;
                    default:
                        alert("An unknown error occurred.");
                        break;
                }
            }
        );
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        setShowUserMenu(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsSidebarOpen(false); // Close sidebar on search
        }
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${isScrolled ? 'glass-nav shadow-lg' : 'bg-transparent'}`}>
                {/* Top Bar - Hides on scroll */}
                <div className={`transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'} bg-gradient-to-r from-indigo-900 to-purple-900 text-white text-xs`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleLocationClick}
                                className="flex items-center space-x-1 hover:text-white/80 transition-colors focus:outline-none"
                            >
                                <MapPin size={12} />
                                <span>Deliver to: <strong>{isLocating ? 'Locating...' : locationName}</strong></span>
                            </button>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/deals" className="hover:text-white/80 transition-colors font-medium">
                                🎉 Special Offers
                            </Link>
                            <span className="opacity-50">|</span>
                            <button
                                onClick={() => setShowSupportModal(true)}
                                className="hover:text-white/80 transition-colors focus:outline-none"
                            >
                                24/7 Support
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Navbar */}
                <div className={`${isScrolled ? 'py-2' : 'py-4'} transition-all duration-300`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">

                            {/* Left Side: Hamburger & Logo */}
                            <div className="flex items-center">
                                <button
                                    onClick={toggleSidebar}
                                    className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
                                    aria-label="Open Menu"
                                >
                                    <Menu size={24} />
                                </button>
                                <Link to="/" className="text-3xl font-black tracking-tighter text-gradient flex-shrink-0 mr-8">
                                    Nexa<span className="text-slate-900 dark:text-white">Cart</span>.
                                </Link>
                            </div>

                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8 hidden md:block">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search for premium products..."
                                        className="w-full px-5 py-2.5 pl-12 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all shadow-sm group-hover:shadow-md"
                                    />
                                    <Search className="absolute left-4 top-3 text-gray-400 group-hover:text-indigo-500 transition-colors" size={20} />
                                </div>
                            </form>

                            {/* Right Side Icons */}
                            <div className="flex items-center space-x-6">
                                {user ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowUserMenu(!showUserMenu)}
                                            className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            <User size={20} />
                                            <span className="font-medium">{user.username}</span>
                                            <ChevronDown size={16} />
                                        </button>

                                        {showUserMenu && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
                                                <Link
                                                    to="/profile"
                                                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <User size={16} className="inline mr-2" />
                                                    My Profile
                                                </Link>
                                                <Link
                                                    to="/orders"
                                                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <Package size={16} className="inline mr-2" />
                                                    Orders
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    <LogOut size={16} className="inline mr-2" />
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="px-4 py-2 rounded-lg text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}

                                {/* Wishlist */}
                                <Link
                                    to="/wishlist"
                                    className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                                    title="Wishlist"
                                >
                                    <Heart size={22} />
                                    {wishlistCount > 0 && (
                                        <span className="absolute top-0 right-0 h-4 w-4 bg-pink-500 rounded-full text-xs text-white flex items-center justify-center">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </Link>

                                {/* Cart */}
                                <Link
                                    to="/cart"
                                    className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                                    title="Cart"
                                >
                                    <ShoppingCart size={22} />
                                    {getCartCount() > 0 && (
                                        <span className="absolute top-0 right-0 h-4 w-4 bg-red-600 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
                                            {getCartCount()}
                                        </span>
                                    )}
                                </Link>

                                {/* Dark Mode Toggle */}
                                <DarkModeToggle />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsSidebarOpen(false)}
                                className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                            />

                            {/* Drawer */}
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-2xl z-[70] overflow-y-auto"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-8">
                                        <Link to="/" className="text-2xl font-black text-gradient" onClick={() => setIsSidebarOpen(false)}>
                                            Nexa<span className="text-slate-900 dark:text-white">Cart</span>.
                                        </Link>
                                        <button
                                            onClick={() => setIsSidebarOpen(false)}
                                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {user && (
                                            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                                                    {user.username.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">Hello, {user.username}</p>
                                                    <p className="text-xs text-gray-500">Welcome back!</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-1">
                                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Shop</h3>
                                            <Link to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center space-x-3 px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                                <Home size={20} />
                                                <span>Go to Home Page</span>
                                            </Link>
                                            <button
                                                onClick={() => { setShowCategoryModal(true); setIsSidebarOpen(false); }}
                                                className="w-full flex items-center space-x-3 px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                            >
                                                <Menu size={20} />
                                                <span>All Categories</span>
                                            </button>
                                            <Link to="/deals" onClick={() => setIsSidebarOpen(false)} className="flex items-center space-x-3 px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                                <Tag size={20} />
                                                <span>Today's Deals</span>
                                            </Link>
                                            <Link to="/new-arrivals" onClick={() => setIsSidebarOpen(false)} className="flex items-center space-x-3 px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                                <Sparkles size={20} />
                                                <span>New Arrivals</span>
                                            </Link>
                                            <Link to="/trending" onClick={() => setIsSidebarOpen(false)} className="flex items-center space-x-3 px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                                <TrendingUp size={20} />
                                                <span>Trending</span>
                                            </Link>
                                            <Link to="/bestsellers" onClick={() => setIsSidebarOpen(false)} className="flex items-center space-x-3 px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                                <Star size={20} />
                                                <span>Best Sellers</span>
                                            </Link>
                                        </div>

                                        <div className="space-y-1">
                                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Services</h3>
                                            <button onClick={() => { setShowGiftCardModal(true); setIsSidebarOpen(false); }} className="w-full flex items-center space-x-3 px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                                <Gift size={20} />
                                                <span>Gift Cards</span>
                                            </button>
                                            <Link to="/register" onClick={() => setIsSidebarOpen(false)} className="flex items-center space-x-3 px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                                <Briefcase size={20} />
                                                <span>Become a Seller</span>
                                            </Link>
                                            <a href="#" className="flex items-center space-x-3 px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                                <Download size={20} />
                                                <span>Download App</span>
                                            </a>
                                            <button onClick={() => { setShowSupportModal(true); setIsSidebarOpen(false); }} className="w-full flex items-center space-x-3 px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                                <Phone size={20} />
                                                <span>24/7 Support</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

            </nav>

            {/* Category Modal */}
            <CategoryModal isOpen={showCategoryModal} onClose={() => setShowCategoryModal(false)} />

            {/* Gift Card Modal */}
            <GiftCardModal isOpen={showGiftCardModal} onClose={() => setShowGiftCardModal(false)} />

            {/* Support Modal */}
            {showSupportModal && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-2xl transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Customer Support</h3>
                            <button
                                onClick={() => setShowSupportModal(false)}
                                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-6">
                            <p className="text-gray-600 dark:text-gray-300">
                                Our support team is available 24/7 to assist you with any queries.
                            </p>
                            <div className="space-y-4">
                                {/* Phone Number 1 */}
                                <a href="tel:+919876543210" className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <Phone size={20} className="text-blue-600 dark:text-blue-400" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Toll Free (India)</span>
                                        <span className="font-medium">+91 98765 43210</span>
                                    </div>
                                </a>

                                {/* Phone Number 2 */}
                                <a href="tel:+912212345678" className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <Phone size={20} className="text-blue-600 dark:text-blue-400" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Support Desk</span>
                                        <span className="font-medium">+91 22 1234 5678</span>
                                    </div>
                                </a>

                                {/* Email */}
                                <a href="mailto:support@nexacart.com" className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <Mail size={20} className="text-blue-600 dark:text-blue-400" />
                                    <span className="font-medium">support@nexacart.com</span>
                                </a>

                                {/* AI Chat Button */}
                                <button
                                    onClick={() => {
                                        setShowSupportModal(false);
                                        if (setIsChatOpen) setIsChatOpen(true);
                                    }}
                                    className="w-full flex items-center space-x-3 text-gray-700 dark:text-gray-200 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                                >
                                    <MessageCircle size={20} className="text-blue-600 dark:text-blue-400" />
                                    <span className="font-medium">Start AI Chat Support</span>
                                </button>
                            </div>
                            <button
                                onClick={() => setShowSupportModal(false)}
                                className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg hover:shadow-lg hover:opacity-90 transition-all font-medium"
                            >
                                Close Support
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
