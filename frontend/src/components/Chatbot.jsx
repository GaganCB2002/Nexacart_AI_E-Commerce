import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ShoppingBag, ArrowRight, Headset, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockProducts } from '../utils/mockData';

const Chatbot = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeBot, setActiveBot] = useState(null); // 'support' | 'shopper' | null
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    // Initial Greetings
    const SUPPORT_GREETING = { id: 1, text: "Hello! I'm your Customer Support Assistant. I can help with Orders, Returns, and Shipping.", sender: 'bot', type: 'text' };
    const SHOPPER_GREETING = { id: 1, text: "Hi! I'm your AI Personal Shopper. Ask me about any product!", sender: 'bot', type: 'text' };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const openSupportBot = () => {
        setActiveBot('support');
        setMessages([SUPPORT_GREETING]);
        setIsOpen(true);
    };

    const openShopperBot = () => {
        setActiveBot('shopper');
        setMessages([SHOPPER_GREETING]);
        setIsOpen(true);
    };

    const closeChat = () => {
        setIsOpen(false);
        setActiveBot(null);
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: 'user', type: 'text' };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        // Simulated AI response
        setTimeout(() => {
            const botResponse = activeBot === 'support'
                ? getSupportResponse(input)
                : getShopperResponse(input);
            setMessages(prev => [...prev, botResponse]);
        }, 800);
    };

    // --- SUPPORT BOT LOGIC ---
    const getSupportResponse = (query) => {
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes('order') || lowerQuery.includes('track')) return { id: Date.now() + 1, text: "You can track your order in the 'My Orders' section.", sender: 'bot', type: 'text' };
        if (lowerQuery.includes('return') || lowerQuery.includes('refund')) return { id: Date.now() + 1, text: "We have a 30-day return policy. Please contact support to initiate a return.", sender: 'bot', type: 'text' };
        if (lowerQuery.includes('shipping') || lowerQuery.includes('delivery')) return { id: Date.now() + 1, text: "Standard shipping takes 3-5 business days.", sender: 'bot', type: 'text' };
        if (lowerQuery.includes('contact') || lowerQuery.includes('support')) return { id: Date.now() + 1, text: "You can reach us at support@nexacart.com or call +91 98765 43210.", sender: 'bot', type: 'text' };
        if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) return { id: Date.now() + 1, text: "Hello! How can I assist you with your order today?", sender: 'bot', type: 'text' };

        return { id: Date.now() + 1, text: "I can only help with customer support queries (Orders, Shipping, Returns). For product recommendations, please use the AI Shopper!", sender: 'bot', type: 'text' };
    };

    // --- SHOPPER BOT LOGIC ---
    const getShopperResponse = (query) => {
        const lowerQuery = query.toLowerCase();

        // 1. Specialized Demo Logic (Washing Machine)
        if (
            lowerQuery.includes('washing machine') &&
            lowerQuery.includes('30000') &&
            lowerQuery.includes('40000')
        ) {
            const products = mockProducts.filter(p => [5, 6].includes(p.id));
            if (products.length > 0) {
                return {
                    id: Date.now() + 1,
                    sender: 'bot',
                    type: 'comparison',
                    text: "I found top rated washing machines in that range:",
                    data: products
                };
            }
        }

        // 2. Formatting Demo Trigger (if user typed exact trigger phrase manually)
        if (lowerQuery.includes('identify') && lowerQuery.includes('product')) {
            return { id: Date.now() + 1, text: "Please describe what you are looking for!", sender: 'bot', type: 'text' };
        }

        // 3. General Product Search (Finds 4-5 products)
        const matchedProducts = mockProducts.filter(p =>
            lowerQuery.includes(p.name.toLowerCase()) ||
            p.name.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery)
        );

        if (matchedProducts.length > 0) {
            // Limit to 5 products as requested
            const displayProducts = matchedProducts.slice(0, 5);
            return {
                id: Date.now() + 1,
                sender: 'bot',
                type: 'comparison',
                text: `I found ${matchedProducts.length} product(s) for you! Here are the top suggestions: `,
                data: displayProducts
            };
        }

        return { id: Date.now() + 1, text: `Sorry, I couldn't find any products matching "${query}". Try searching for 'Phone', 'Watch', or 'Decor'.`, sender: 'bot', type: 'text' };
    };

    const handleSelectProduct = (product) => {
        closeChat();
        navigate('/checkout', {
            state: {
                prefill: true,
                selectedProduct: product
            }
        });
    };

    const triggerIdentify = () => {
        if (!user) {
            alert("Please log in to use the Product Identifier.");
            navigate('/login');
            return;
        }
        setActiveBot('shopper');
        setIsOpen(true);
        // User requested to manually input the query
        setMessages([SHOPPER_GREETING]);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {!isOpen && (
                <div className="flex flex-col gap-3 items-end">
                    {/* Access to Shopper Bot Demo */}
                    <button
                        onClick={triggerIdentify}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 text-white rounded-full shadow-lg transition-all flex items-center justify-center gap-2 animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                    >
                        <Sparkles size={20} />
                        <span className="font-semibold text-sm">Identify the Product</span>
                    </button>

                    {/* Access to Support Bot */}
                    <button
                        onClick={openSupportBot}
                        className="w-14 h-14 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-full shadow-xl border border-blue-100 dark:border-slate-700 hover:scale-110 transition-all flex items-center justify-center"
                        title="Customer Support"
                    >
                        <Headset size={24} />
                    </button>

                    {/* Access to Shopper Bot (General) */}
                    {/* AI Shopper Button Removed as per request */}
                </div>
            )}

            {isOpen && (
                <div className="w-96 h-[36rem] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col border border-slate-200 dark:border-slate-700 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className={`p-4 text-white flex justify-between items-center ${activeBot === 'support' ? "bg-slate-800" : "bg-gradient-to-r from-blue-600 to-indigo-600"}`}>
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-full">
                                {activeBot === 'support' ? <Headset size={20} /> : <Sparkles size={20} />}
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">
                                    {activeBot === 'support' ? "Customer Support" : "Nexa AI Shopper"}
                                </h3>
                                <p className="text-xs opacity-90">Online</p>
                            </div>
                        </div>
                        <button onClick={closeChat} className="hover:bg-white/20 p-1.5 rounded-full transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900 scroll-smooth">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.type === 'text' ? (
                                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                ) : (
                                    <div className="w-full max-w-[95%] space-y-3">
                                        <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl rounded-bl-none border border-slate-200 dark:border-slate-700 shadow-sm text-sm text-slate-600 dark:text-slate-300">
                                            {msg.text}
                                        </div>
                                        {/* Product Carousel */}
                                        <div className="flex gap-3 overflow-x-auto pb-4 snap-x pr-2">
                                            {msg.data.map(product => (
                                                <div key={product.id} className="min-w-[160px] w-[160px] bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-2 shadow-sm hover:shadow-lg transition-shadow snap-start">
                                                    <div className="h-28 w-full bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative">
                                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{product.name}</h4>
                                                        <p className="text-blue-600 font-bold text-sm">₹{product.price.toLocaleString()}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleSelectProduct(product)}
                                                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                                                    >
                                                        Select <ArrowRight size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={activeBot === 'support' ? "Ask about orders..." : "Ask for products..."}
                            className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
