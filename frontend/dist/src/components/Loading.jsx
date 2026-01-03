import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loading = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center z-50">
            <div className="text-center">
                {/* Animated Logo/Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="mb-8"
                >
                    <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
                        />
                    </div>
                </motion.div>

                {/* Brand Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl font-extrabold text-white mb-4 tracking-tight"
                >
                    NexaCart
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/90 text-lg mb-8 font-light"
                >
                    Next-Gen Shopping Experience
                </motion.p>

                {/* Progress Bar */}
                <div className="w-80 mx-auto">
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-gradient-to-r from-white to-blue-200 rounded-full shadow-lg"
                        />
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-white/80 text-sm mt-3 font-medium"
                    >
                        Loading {progress}%
                    </motion.p>
                </div>

                {/* Floating Dots Animation */}
                <div className="flex justify-center space-x-2 mt-8">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                            className="w-3 h-3 bg-white rounded-full shadow-lg"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Loading;
