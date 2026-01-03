import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative bg-white dark:bg-gray-900 pt-20 pb-10 overflow-hidden mt-20 border-t border-gray-200 dark:border-gray-800">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[500px] -left-[500px] w-[1000px] h-[1000px] bg-indigo-50 dark:bg-indigo-950/20 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-[500px] -right-[500px] w-[1000px] h-[1000px] bg-purple-50 dark:bg-purple-950/20 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="text-3xl font-black tracking-tighter text-gradient mb-6 block">
                            Nexa<span className="text-slate-900 dark:text-white">Cart</span>.
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            Experience the future of shopping. Premium products, seamless delivery, and 24/7 support tailored just for you.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-400 transition-all duration-300">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 transition-all duration-300">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-700 transition-all duration-300">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-600 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/deals" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-600 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                    Today's Deals
                                </Link>
                            </li>
                            <li>
                                <Link to="/new-arrivals" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-600 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link to="/trending" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-600 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                    Trending Now
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Customer Service</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/profile" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-600 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-600 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                    Order History
                                </Link>
                            </li>
                            <li>
                                <Link to="/wishlist" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-600 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                    Wishlist
                                </Link>
                            </li>
                            <li>
                                <Link to="/track-order/1" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-600 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                    Track Order
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400">
                                <MapPin size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                                <span>123 Tech Park, Innovation Street, Bangalore - 560100</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                                <Phone size={20} className="text-blue-600 flex-shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                                <Mail size={20} className="text-blue-600 flex-shrink-0" />
                                <span>support@nexacart.com</span>
                            </li>
                        </ul>

                        {/* Newsletter Mini */}
                        <div className="mt-6">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="absolute right-1 top-1 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
                        © 2024 NexaCart. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
