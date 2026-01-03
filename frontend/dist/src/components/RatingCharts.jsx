import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const RatingCharts = ({ ratings }) => {
    // Mock Data if no ratings provider
    const starData = [
        { name: '5★', count: 150 },
        { name: '4★', count: 80 },
        { name: '3★', count: 25 },
        { name: '2★', count: 10 },
        { name: '1★', count: 5 },
    ];

    const sentimentData = [
        { name: 'Positive', value: 75, color: '#10b981' }, // Green
        { name: 'Neutral', value: 15, color: '#f59e0b' }, // Amber
        { name: 'Negative', value: 10, color: '#ef4444' }, // Red
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Bar Chart: Star Distribution */}
            <div className="glass-card p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Rating Distribution</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={starData} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={30} tick={{ fill: '#94a3b8' }} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#1e293b', color: '#fff' }}
                            />
                            <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pie Chart: Sentiment Analysis */}
            <div className="glass-card p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Customer Sentiment</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={sentimentData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {sentimentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#1e293b', color: '#fff' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default RatingCharts;
