import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShoppingBag, Zap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernHero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white dark:from-indigo-950 dark:via-black dark:to-black z-0" />

            {/* Floating Blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-300/30 dark:bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-32 left-20 w-[600px] h-[600px] bg-pink-300/30 dark:bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center space-x-2 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 mb-8 border border-indigo-100 dark:border-indigo-500/20"
                        >
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-300">New Collection Live</span>
                        </motion.div>

                        <h1 className="text-6xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
                            Redefine <br />
                            <span className="text-gradient">Your Style.</span>
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed font-light">
                            Discover the most premium selection of fashion and tech. curated just for you. Quality meets innovation in every item.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/search" className="btn-primary group">
                                <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
                                Start Shopping
                            </Link>
                            <Link to="/trending" className="btn-secondary group">
                                <TrendingUp className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                                <span>Explore Trends</span>
                                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-500">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-500" fill="currentColor" />
                                <span>Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                <span>Premium Quality</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Content (Floating Cards) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative hidden lg:block h-[600px]"
                        style={{ y: y1 }}
                    >
                        {/* Main Floating Image */}
                        <div className="absolute top-10 right-10 w-[400px] h-[500px] rounded-3xl overflow-hidden glass-card z-20 rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800"
                                alt="Fashion Model"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                            />
                            {/* Floating Stats Card - Inside */}
                            <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-white/80">Featured</p>
                                    <p className="text-white font-bold">Summer Collection</p>
                                </div>
                                <div className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full">New</div>
                            </div>
                        </div>

                        {/* Secondary Floating Element */}
                        <motion.div
                            style={{ y: y2 }}
                            className="absolute bottom-20 left-0 w-[240px] glass-card p-4 z-30"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                                    <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold dark:text-white">Total Sales</p>
                                    <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                                        +24% <TrendingUp size={10} />
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-[70%]" />
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Target</span>
                                    <span>70%</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ModernHero;
