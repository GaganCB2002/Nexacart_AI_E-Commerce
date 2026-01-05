import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

const PriceChart = ({ data }) => {
    // Product data for rotation
    const products = [
        { name: 'Neon Kicks', basePrice: 10200, color: '#3b82f6' },
        { name: 'Cyber Hoodie', basePrice: 7225, color: '#8b5cf6' },
        { name: 'Holo Watch', basePrice: 21250, color: '#ec4899' },
        { name: 'Plasma Lamp', basePrice: 3825, color: '#10b981' }
    ];

    // Initialize with provided data or empty array
    const [chartData, setChartData] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const [currentProduct, setCurrentProduct] = useState(products[0]);

    useEffect(() => {
        if (data && data.length > 0) {
            const formattedData = data.map(item => ({
                date: new Date(item.timestamp).toLocaleDateString(),
                price: item.price
            }));
            setChartData(formattedData);
            setCurrentPrice(formattedData[formattedData.length - 1].price);
        }
    }, [data]);


    useEffect(() => {
        // Rotate products and update prices every second
        const interval = setInterval(() => {
            setCurrentProductIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % products.length;
                const nextProduct = products[nextIndex];
                setCurrentProduct(nextProduct);

                // Generate smooth sine wave price variation (matching the aesthetic of the uploaded image)
                const time = Date.now() / 1000; // current time in seconds
                const variation = Math.sin(time) * (nextProduct.basePrice * 0.05); // ±5% wave
                const newPrice = nextProduct.basePrice + variation;
                setCurrentPrice(newPrice);

                // Update chart data
                setChartData(prevData => {
                    const newPoint = {
                        date: new Date().toLocaleTimeString(),
                        price: newPrice
                    };
                    // Keep last 20 points for smooth wave visualization
                    return [...prevData.slice(-19), newPoint];
                });

                return nextIndex;
            });
        }, 200); // Faster update (200ms) for smoother animation

        return () => clearInterval(interval);
    }, []);

    if (!chartData || chartData.length === 0) return <div className="text-gray-400 italic">No price history available.</div>;

    return (
        <div className="h-full w-full p-4 glass-card rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Live Price:</h3>
                    <div
                        className="px-3 py-1 rounded-full text-sm font-bold text-white transition-all duration-300"
                        style={{ backgroundColor: currentProduct.color }}
                    >
                        {currentProduct.name}
                    </div>
                </div>
                <div className="text-lg font-bold text-slate-800 dark:text-white">
                    ₹{currentPrice.toFixed(2)}
                </div>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-10" />
                        <XAxis
                            dataKey="date"
                            fontSize={10}
                            stroke="#64748b"
                            tickFormatter={(value) => value}
                            interval="preserveStartEnd"
                        />
                        <YAxis fontSize={12} stroke="#64748b" domain={['auto', 'auto']} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '8px',
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                color: '#1e293b'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke={currentProduct.color}
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6 }}
                            isAnimationActive={false} // Disable animation for smoother live updates
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PriceChart;
