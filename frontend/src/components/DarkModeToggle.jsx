import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const DarkModeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon size={20} className="text-slate-700" />
            ) : (
                <Sun size={20} className="text-yellow-400" />
            )}
        </button>
    );
};

export default DarkModeToggle;
