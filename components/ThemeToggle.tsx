import React from 'react';

interface ThemeToggleProps {
    theme: 'light' | 'dark';
    onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="w-10 h-10 p-2 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 text-orange-500 dark:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <span className="relative w-6 h-6 overflow-hidden">
                {/* Sun Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className={`absolute inset-0 w-full h-full transform transition-all duration-500 ease-in-out ${
                        theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
                    }`}
                >
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.061l1.591-1.59a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.894 17.894a.75.75 0 01-1.06 0l-1.59-1.591a.75.75 0 111.06-1.06l1.59 1.59a.75.75 0 010 1.061zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM6.106 17.894a.75.75 0 010-1.06l1.59-1.591a.75.75 0 111.06 1.06l-1.59 1.59a.75.75 0 01-1.06 0zM4.5 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zM6.106 6.106a.75.75 0 011.06 0l1.591 1.59a.75.75 0 01-1.06 1.061L6.106 7.167a.75.75 0 010-1.06z" />
                </svg>
                {/* Moon Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className={`absolute inset-0 w-full h-full transform transition-all duration-500 ease-in-out ${
                        theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                    }`}
                >
                     <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.463-.948.75.75 0 01.976.976 10.5 10.5 0 11-9.962-9.962.75.75 0 01.819.162z" clipRule="evenodd" />
                </svg>
            </span>
        </button>
    );
};