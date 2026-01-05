import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    // Load cart from localStorage on mount (Guest)
    useEffect(() => {
        if (!user) {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCartItems(JSON.parse(savedCart));
            }
        }
    }, [user]);

    // Sync with backend when user logs in
    useEffect(() => {
        if (user) {
            // 1. Fetch backend cart
            api.get(`/cart/${user.id}`)
                .then(res => {
                    const serverCart = res.data;

                    // 2. Merge local guest cart if exists
                    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
                    if (localCart.length > 0) {
                        // For simplicity, we just add local items to backend one by one
                        const promises = localCart.map(item =>
                            api.post(`/cart/${user.id}/add`, { productId: item.id, quantity: item.quantity })
                        );

                        Promise.all(promises)
                            .then(() => {
                                // 3. Re-fetch merged cart
                                return api.get(`/cart/${user.id}`);
                            })
                            .then(mergedRes => {
                                setCartItems(mergedRes.data.map(item => ({
                                    ...item.product,
                                    quantity: item.quantity,
                                    cartItemId: item.id
                                })));
                                localStorage.removeItem('cart'); // Clear local cart after merge
                            });
                    } else {
                        // No local cart, just use server cart
                        setCartItems(serverCart.map(item => ({
                            ...item.product,
                            quantity: item.quantity,
                            cartItemId: item.id
                        })));
                    }
                })
                .catch(err => console.error("Error fetching cart:", err));
        } else {
            // If logout, ensure we verify state (usually handled by clearing state)
            setCartItems([]);
        }
    }, [user]);

    // Save Guest cart to localStorage
    useEffect(() => {
        if (!user) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems, user]);

    const addToCart = (product, quantity = 1) => {
        if (user) {
            api.post(`/cart/${user.id}/add`, { productId: product.id, quantity })
                .then(res => {
                    if (res.data && Array.isArray(res.data)) {
                        setCartItems(res.data
                            .filter(item => item.product) // Prevent null product crash
                            .map(item => ({
                                ...item.product,
                                quantity: item.quantity,
                                cartItemId: item.id
                            }))
                        );
                    }
                })
                .catch(err => {
                    console.error("Failed to add to cart:", err);
                    const errorMessage = err.response?.data?.message || err.response?.data || err.message || "Unknown error";
                    alert(`Failed to add item to cart: ${errorMessage}`);
                });
        } else {
            // Guest logic
            setCartItems(prevItems => {
                const existingItem = prevItems.find(item => item.id === product.id);
                if (existingItem) {
                    return prevItems.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                }
                return [...prevItems, { ...product, quantity }];
            });
        }
    };

    const removeFromCart = (productId) => {
        if (user) {
            api.delete(`/cart/${user.id}/remove/${productId}`)
                .then(res => {
                    setCartItems(res.data.map(item => ({
                        ...item.product,
                        quantity: item.quantity,
                        cartItemId: item.id
                    })));
                });
        } else {
            setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
        }
    };

    const updateQuantity = (productId, newQuantity) => {
        if (user) {
            api.put(`/cart/${user.id}/update`, { productId, quantity: newQuantity })
                .then(res => {
                    setCartItems(res.data.map(item => ({
                        ...item.product,
                        quantity: item.quantity,
                        cartItemId: item.id
                    })));
                });
        } else {
            if (newQuantity < 1) {
                removeFromCart(productId);
                return;
            }
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        }
    };

    const clearCart = () => {
        if (user) {
            api.delete(`/cart/${user.id}/clear`)
                .then(() => setCartItems([]));
        } else {
            setCartItems([]);
        }
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
