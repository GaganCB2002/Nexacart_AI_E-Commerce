import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, CreditCard, Bell, Heart, Power, Box, ChevronRight, Edit2, Plus } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');

    const [personalInfo, setPersonalInfo] = useState({
        firstName: user?.username || 'User',
        lastName: '',
        gender: 'Male',
        email: user?.email || 'user@example.com',
        mobile: '+91 9876543210'
    });

    const [addresses, setAddresses] = useState([
        { id: 1, type: 'Home', name: user?.username || 'User', mobile: '98765 43210', address: '123, Main Street, Galaxy Apartment', locality: 'Indiranagar', city: 'Bengaluru', state: 'Karnataka', pincode: '560038' }
    ]);

    const handleInfoChange = (e) => {
        setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
    };

    const menuItems = [
        { id: 'personal', label: 'Personal Information', icon: User },
        { id: 'addresses', label: 'Manage Addresses', icon: MapPin },
        { id: 'orders', label: 'My Orders', icon: Box, path: '/orders' },
        { id: 'pan', label: 'PAN Card Information', icon: CreditCard },
        { id: 'payments', label: 'Saved Cards & Wallet', icon: CreditCard },
        { id: 'reviews', label: 'My Reviews & Ratings', icon: Bell },
        { id: 'notifications', label: 'All Notifications', icon: Bell },
        { id: 'wishlist', label: 'My Wishlist', icon: Heart },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'personal':
                return (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                            <button className="text-blue-600 font-medium text-sm">Edit</button>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={personalInfo.firstName}
                                        onChange={handleInfoChange}
                                        className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={personalInfo.lastName}
                                        onChange={handleInfoChange}
                                        className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Gender</label>
                                <div className="flex space-x-6">
                                    {['Male', 'Female'].map((option) => (
                                        <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={option}
                                                checked={personalInfo.gender === option}
                                                onChange={handleInfoChange}
                                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-gray-700 dark:text-gray-300">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={personalInfo.email}
                                            disabled
                                            className="w-full p-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-70"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Mobile Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={personalInfo.mobile}
                                            disabled
                                            className="w-full p-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-70"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'addresses':
                return (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Manage Addresses</h2>
                            <button className="flex items-center space-x-2 text-blue-600 font-medium text-sm border border-blue-600 px-4 py-2 rounded-[4px] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                <Plus size={16} />
                                <span>ADD A NEW ADDRESS</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {addresses.map((addr) => (
                                <div key={addr.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded uppercase font-medium">{addr.type}</span>
                                            <div className="flex items-center space-x-4 mt-2 mb-1">
                                                <span className="font-semibold text-gray-900 dark:text-white">{addr.name}</span>
                                                <span className="text-gray-900 dark:text-white font-medium">{addr.mobile}</span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                                {addr.address}, {addr.locality}, <br />
                                                {addr.city}, {addr.state} - <span className="font-semibold text-gray-900 dark:text-white">{addr.pincode}</span>
                                            </p>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <button>
                                                <i className="fas fa-ellipsis-v text-gray-400"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                        <img
                            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png"
                            alt="Coming Soon"
                            className="w-48 h-48 mb-4 opacity-50"
                        />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Coming Soon</h3>
                        <p className="text-gray-500 dark:text-gray-400">This section is currently under development.</p>
                    </div>
                );
        }
    };

    if (!user) {
        return <div className="pt-24 text-center dark:text-white">Please login to view your profile.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-32 pb-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="lg:w-1/4 space-y-4">
                        {/* User Card */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xl font-bold">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Hello,</div>
                                <div className="font-semibold text-gray-900 dark:text-white">{user.username}</div>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center space-x-3 text-blue-600">
                                <User size={20} />
                                <span className="font-semibold uppercase text-xs tracking-wider">Account Settings</span>
                            </div>
                            <div>
                                {menuItems.slice(0, 4).map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => item.path ? navigate(item.path) : setActiveTab(item.id)}
                                        className={`w-full text-left px-4 py-3.5 text-sm transition-colors flex items-center justify-between hover:bg-blue-50 dark:hover:bg-gray-700 ${activeTab === item.id ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                                    >
                                        <span>{item.label}</span>
                                        {activeTab === item.id && <ChevronRight size={16} />}
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 border-t border-b border-gray-100 dark:border-gray-700 flex items-center space-x-3 text-blue-600">
                                <Box size={20} />
                                <span className="font-semibold uppercase text-xs tracking-wider">My Stuff</span>
                            </div>
                            <div>
                                {menuItems.slice(4).map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full text-left px-4 py-3.5 text-sm transition-colors flex items-center justify-between hover:bg-blue-50 dark:hover:bg-gray-700 ${activeTab === item.id ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                                    >
                                        <span>{item.label}</span>
                                        {activeTab === item.id && <ChevronRight size={16} />}
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    onClick={logout}
                                    className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors w-full"
                                >
                                    <Power size={20} />
                                    <span className="font-medium text-sm">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
