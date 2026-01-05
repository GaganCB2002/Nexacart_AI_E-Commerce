import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);

    // Load from localStorage on mount (Guest)
    useEffect(() => {
        if (!user) {
            const savedWishlist = localStorage.getItem('wishlist');
            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist));
            }
        }
    }, [user]);

    // Sync with backend on login
    useEffect(() => {
        if (user) {
            api.get(`/wishlist/${user.id}`)
                .then(res => {
                    const serverWishlist = res.data;
                    const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

                    if (localWishlist.length > 0) {
                        const promises = localWishlist.map(item =>
                            api.post(`/wishlist/${user.id}/add`, { productId: item.id })
                        );
                        Promise.all(promises)
                            .then(() => api.get(`/wishlist/${user.id}`))
                            .then(mergedRes => {
                                setWishlist(mergedRes.data.map(item => ({
                                    ...item.product,
                                    wishlistItemId: item.id
                                })));
                                localStorage.removeItem('wishlist');
                            });
                    } else {
                        setWishlist(serverWishlist.map(item => ({
                            ...item.product,
                            wishlistItemId: item.id
                        })));
                    }
                })
                .catch(err => console.error("Error fetching wishlist:", err));
        } else {
            setWishlist([]);
        }
    }, [user]);


    // Save to localStorage on change (Guest)
    useEffect(() => {
        if (!user) {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    }, [wishlist, user]);

    const addToWishlist = (product) => {
        if (user) {
            api.post(`/wishlist/${user.id}/add`, { productId: product.id })
                .then(res => {
                    setWishlist(res.data.map(item => ({
                        ...item.product,
                        wishlistItemId: item.id
                    })));
                })
                .catch(err => {
                    console.error("Failed to add to wishlist:", err);
                    const errorMessage = err.response?.data?.message || err.response?.data || err.message || "Unknown error";
                    alert(`Failed to add to wishlist: ${errorMessage}`);
                });
        } else {
            setWishlist((prev) => {
                if (prev.some(item => item.id === product.id)) {
                    return prev;
                }
                return [...prev, product];
            });
        }
    };

    const removeFromWishlist = (productId) => {
        if (user) {
            api.delete(`/wishlist/${user.id}/remove/${productId}`)
                .then(res => {
                    setWishlist(res.data.map(item => ({
                        ...item.product,
                        wishlistItemId: item.id
                    })));
                });
        } else {
            setWishlist((prev) => prev.filter(item => item.id !== productId));
        }
    };

    const toggleWishlist = (product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
    };

    const wishlistCount = wishlist.length;

    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};
