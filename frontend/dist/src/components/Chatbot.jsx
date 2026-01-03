import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

const Chatbot = ({ isOpen, setIsOpen }) => {
    // const [isOpen, setIsOpen] = useState(false); // Using parent state
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your AI assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        // Simulated AI response
        setTimeout(() => {
            const botResponse = getBotResponse(input);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
        }, 1000);
    };

    const getBotResponse = (query) => {
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes('order') || lowerQuery.includes('track')) return "You can track your order in the 'My Orders' section.";
        if (lowerQuery.includes('return') || lowerQuery.includes('refund')) return "We have a 30-day return policy. Please contact support to initiate a return.";
        if (lowerQuery.includes('shipping') || lowerQuery.includes('delivery')) return "Standard shipping takes 3-5 business days.";
        if (lowerQuery.includes('contact') || lowerQuery.includes('support')) return "You can reach us at support@nexacart.com.";
        if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) return "Hello! How can I assist you with your shopping?";
        return "I'm sorry, I didn't quite catch that. Could you please rephrase?";
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                >
                    <MessageSquare size={24} />
                </button>
            )}

            {isOpen && (
                <div className="w-80 h-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <MessageSquare size={20} />
                            <span className="font-medium">AI Support</span>
                        </div>
                        <button onClick={toggleChat} className="hover:bg-blue-700 p-1 rounded">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-900">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[75%] p-3 rounded-lg text-sm ${msg.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-bl-none'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white px-3 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSend}
                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
