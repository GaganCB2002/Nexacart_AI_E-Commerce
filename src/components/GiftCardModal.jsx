import { useState } from 'react';
import { X, Gift, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

const GiftCardModal = ({ isOpen, onClose }) => {
    const [cardCode, setCardCode] = useState('');
    const [pin, setPin] = useState('');
    const [status, setStatus] = useState(null); // 'success', 'error', or null
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mock validation
        if (cardCode.length < 8) {
            setStatus('error');
            setMessage('Invalid gift card code. Please check and try again.');
            return;
        }

        // Mock success
        setStatus('success');
        setMessage('Gift card successfully applied! Balance updated.');
        setTimeout(() => {
            onClose();
            // Reset for next time
            setCardCode('');
            setPin('');
            setStatus(null);
            setMessage('');
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transform scale-100 animate-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>

                    <div className="flex justify-between items-start relative z-10">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                                <Gift size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Redeem Gift Card</h3>
                                <p className="text-pink-100 text-sm">Enter your code below</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Visual Card Representation */}
                    <div className="bg-gray-800 rounded-xl p-6 text-white relative overflow-hidden shadow-lg mx-auto w-full transform transition-transform hover:scale-[1.02] duration-300">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 opacity-50 z-0"></div>
                        <div className="relative z-10 flex flex-col justify-between h-32">
                            <span className="font-bold text-lg tracking-widest">NexaCart</span>
                            <div className="space-y-1">
                                <div className="text-xs text-gray-400 uppercase tracking-wider">Gift Voucher</div>
                                <div className="font-mono text-xl tracking-wider">
                                    {cardCode ? cardCode.padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gift Card Code</label>
                            <div className="relative">
                                <Gift className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    value={cardCode}
                                    onChange={(e) => setCardCode(e.target.value.toUpperCase())}
                                    placeholder="Enter your 16-digit code"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none font-mono uppercase"
                                    maxLength={19} // 16 chars + spaces roughly
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                PIN <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="password"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    placeholder="Enter PIN if applicable"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>
                        </div>

                        {message && (
                            <div className={`p-3 rounded-lg flex items-center space-x-2 text-sm ${status === 'success'
                                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                                }`}>
                                {status === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                <span>{message}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform transition-all active:scale-95 flex items-center justify-center space-x-2"
                        >
                            <span>Redeem & Add to Balance</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GiftCardModal;
