import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
    const [identifier, setIdentifier] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
        return re.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (!validatePassword(newPassword)) {
            setError("Password must have 8+ chars, Uppercase, Lowercase, Number & Special Symbol!");
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/auth/reset-password', {
                identifier,
                newPassword
            });

            if (response.data.status === 'SUCCESS') {
                setMessage(response.data.message);
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("Failed to reset password. User may not exist.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-40">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden my-8"
            >
                <div className="bg-indigo-600 px-8 py-6 flex items-center gap-4">
                    <button onClick={() => navigate('/login')} className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Reset Password</h2>
                        <p className="text-indigo-100 text-sm">Enter your details to reset</p>
                    </div>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-center gap-2">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm border border-green-100 flex items-center gap-2">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email or Username</label>
                            <input
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
                                required
                                placeholder="Enter registered email or username"
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
                                required
                                placeholder="8+ chars, Upper, Lower, Number, Special"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 mt-4"
                        >
                            {loading ? 'Processing...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
