import React, { useState, useEffect } from 'react';
import { ActiveView, Language, Theme, SessionHistoryItem, UserLevel } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { LANGUAGES, USER_LEVELS } from '../constants';
import { EvolvingAvatar } from './EvolvingAvatar';

interface SidebarProps {
    activeView: ActiveView;
    sessionHistory: SessionHistoryItem[];
    onNavigate: (view: ActiveView) => void;
    onLogout: () => void;
    theme: Theme;
    onToggleTheme: () => void;
    language: Language;
    onSetLanguage: (lang: Language) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <li>
        <button
            onClick={onClick}
            aria-current={isActive ? 'page' : undefined}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive
                    ? 'bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
        >
            <span className="w-5 h-5">{icon}</span>
            <span>{label}</span>
        </button>
    </li>
);

export const Sidebar: React.FC<SidebarProps> = ({
    activeView,
    sessionHistory,
    onNavigate,
    onLogout,
    theme,
    onToggleTheme,
    language,
    onSetLanguage
}) => {
    const [userName, setUserName] = useState('User');

    // Load user name and listen for changes to keep it updated
    useEffect(() => {
        const storedName = localStorage.getItem('moodscape_userName') || 'User';
        setUserName(storedName);

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'moodscape_userName') {
                setUserName(event.newValue || 'User');
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const sessionCount = sessionHistory.length;
    const userLevel = [...USER_LEVELS].reverse().find(level => sessionCount >= level.threshold) || USER_LEVELS[0];

    return (
        <aside className="w-64 flex-shrink-0 glassmorphism rounded-2xl p-4 flex flex-col">
            <div className="flex items-center gap-3 px-2 mb-8">
                <div className="w-8 h-8 text-cyan-500 dark:text-cyan-400" style={{ filter: 'drop-shadow(0 0 8px currentColor)'}}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c-1.39 0-2.73.29-3.95.84l.89.89a6.5 6.5 0 018.12 0l.89-.89A7.96 7.96 0 0012 4zm0 14a6 6 0 01-4.24-1.76l-.89.89A8 8 0 0012 20a8 8 0 007.13-4.87l-.89-.89A6 6 0 0112 18z"></path><path d="M12 6a6 6 0 00-6 6 6 6 0 006 6 6 6 0 006-6 6 6 0 00-6-6zm0 2a4 4 0 110 8 4 4 0 010-8z"></path><circle cx="12" cy="12" r="2" fill="currentColor"></circle></svg>
                </div>
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100">MoodScape</span>
            </div>

            <nav className="flex-grow">
                <ul className="space-y-2">
                    <NavItem 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.507 6.054a.75.75 0 01.635 1.22l-1.3 2.25a.75.75 0 01-1.27- .734l1.3-2.25a.75.75 0 01.635-.486zM14.493 6.054a.75.75 0 011.27.734l-1.3 2.25a.75.75 0 01-1.27-.734l1.3-2.25a.75.75 0 010- .52zM10 10a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0zm-6 3a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2z" /></svg>}
                        label="Dashboard"
                        isActive={activeView === 'dashboard'}
                        onClick={() => onNavigate('dashboard')}
                    />
                    <NavItem 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" /></svg>}
                        label="Create"
                        isActive={['create', 'moodscape_creation', 'resilience_quest', 'vision_board'].includes(activeView)}
                        onClick={() => onNavigate('create')}
                    />
                    <NavItem 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-5.912-3.953a.75.75 0 011.061-1.061 5.5 5.5 0 107.702 0 .75.75 0 111.06 1.06 7 7 0 11-9.824 0zM10 10.25a2.75 2.75 0 100-5.5 2.75 2.75 0 000 5.5z" clipRule="evenodd" /></svg>}
                        label="Community"
                        isActive={activeView === 'community_gallery'}
                        onClick={() => onNavigate('community_gallery')}
                    />
                     <NavItem 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H8.06l-2.47 2.47a.75.75 0 01-1.06-1.06L6.94 13H1.75a.75.75 0 0 1-.75-.75V2.75zm1.5 0v7.5h11V2.75H2.5z" clipRule="evenodd" /></svg>}
                        label="Mindful Chat"
                        isActive={activeView === 'chat'}
                        onClick={() => onNavigate('chat')}
                    />
                    <NavItem 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.75 1.5a.75.75 0 00-1.5 0v1.25a.75.75 0 001.5 0V1.5zM3.854 4.56a.75.75 0 00-1.06 1.06l.94.94a.75.75 0 101.06-1.06l-.94-.94zM16.146 4.56a.75.75 0 00-1.06-1.06l-.94.94a.75.75 0 001.06 1.06l.94-.94zM1.5 10.75a.75.75 0 000-1.5h1.25a.75.75 0 000 1.5H1.5zM17.25 10.75a.75.75 0 000-1.5h1.25a.75.75 0 000 1.5h-1.25zM3.854 15.44a.75.75 0 10-1.06-1.06l-.94.94a.75.75 0 001.06 1.06l.94-.94zM10.75 17.25a.75.75 0 00-1.5 0v1.25a.75.75 0 001.5 0v-1.25zM16.146 15.44a.75.75 0 10-1.06 1.06l.94-.94a.75.75 0 00-1.06-1.06l-.94.94z" /></svg>}
                        label="Pricing"
                        isActive={activeView === 'pricing'}
                        onClick={() => onNavigate('pricing')}
                    />
                </ul>
            </nav>

            <div className="flex-shrink-0 mt-4 pt-4 border-t border-slate-300/20 dark:border-slate-700/20">
                 <button
                    onClick={() => onNavigate('profile')}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 flex items-center gap-3 transition-colors mb-4"
                >
                    <EvolvingAvatar userName={userName} sessionCount={sessionCount} />
                    <div className="overflow-hidden">
                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">{userName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{userLevel.name}</p>
                    </div>
                </button>
                
                <div className="space-y-2">
                     <select
                        value={language}
                        onChange={(e) => onSetLanguage(e.target.value as Language)}
                        className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-800 dark:text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                        aria-label="Select language"
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.value} value={lang.value}>
                                {lang.label}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center justify-between gap-2">
                        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
                         <button
                            onClick={onLogout}
                            className="flex-grow flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-red-500/10 dark:hover:bg-red-400/10 hover:text-red-600 dark:hover:text-red-400 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                              <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
                              <path fillRule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.75a.75.75 0 000 1.5h9.5A.75.75 0 0019 10z" clipRule="evenodd" />
                              <path fillRule="evenodd" d="M15.53 13.03a.75.75 0 00-1.06-1.06l-3 3a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06L13.06 10l2.47-2.47z" clipRule="evenodd" />
                            </svg>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};
