import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import SearchResults from './pages/SearchResults';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import TrackOrder from './pages/TrackOrder';
import TodaysDeals from './pages/TodaysDeals';
import NewArrivals from './pages/NewArrivals';
import Trending from './pages/Trending';
import BestSellers from './pages/BestSellers';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Chatbot from './components/Chatbot';
import Loading from './components/Loading';
import ReminderPopup from './components/ReminderPopup';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Simulate initial app load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="min-h-screen bg-transparent">
              <Navbar setIsChatOpen={setIsChatOpen} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                <Route path="/track-order/:orderId" element={<TrackOrder />} />
                <Route path="/deals" element={<TodaysDeals />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/bestsellers" element={<BestSellers />} />
                <Route path="/bestsellers" element={<BestSellers />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            <Footer />
            <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
            <ReminderPopup />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
