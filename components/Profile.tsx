import React, { useState, useEffect } from 'react';
import { SessionHistoryItem, UserLevel } from '../types';
import { SessionHistoryList } from './SessionHistoryList';
import { EvolvingAvatar } from './EvolvingAvatar';
import { USER_LEVELS } from '../constants';

interface ProfileProps {
    sessionHistory: SessionHistoryItem[];
    onManageSubscription: () => void;
    onLogout: () => void;
    onReturnToDashboard: () => void;
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
    <div className="glassmorphism p-4 rounded-xl flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-500 dark:text-cyan-400 rounded-full" aria-hidden="true">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{value}</p>
        </div>
    </div>
);

export const Profile: React.FC<ProfileProps> = ({ sessionHistory, onManageSubscription, onLogout, onReturnToDashboard }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('User');
    const [email, setEmail] = useState('user@example.com');
    const [tempName, setTempName] = useState(name);
    const [tempEmail, setTempEmail] = useState(email);

    useEffect(() => {
        // Load user data from localStorage on component mount
        const storedName = localStorage.getItem('moodscape_userName') || 'User';
        const storedEmail = localStorage.getItem('moodscape_userEmail') || 'user@example.com';
        setName(storedName);
        setTempName(storedName);
        setEmail(storedEmail);
        setTempEmail(storedEmail);
    }, []);

    const handleEdit = () => {
        setTempName(name);
        setTempEmail(email);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        setName(tempName);
        setEmail(tempEmail);
        localStorage.setItem('moodscape_userName', tempName);
        localStorage.setItem('moodscape_userEmail', tempEmail);
        
        // Dispatch a storage event to notify other components (like Sidebar) of the change
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'moodscape_userName',
            newValue: tempName,
        }));
        
        setIsEditing(false);
    };
    
    const handleClearHistory = () => {
        if (window.confirm("Are you sure you want to clear your session history? This cannot be undone.")) {
            localStorage.removeItem('moodscape_sessionHistory');
            // This component doesn't manage the history state directly,
            // so we rely on the parent to update and re-render.
            // For an immediate visual feedback, you could have a setter passed as prop.
             window.location.reload(); // Simple way to force refresh from parent
        }
    };

    const sessionCount = sessionHistory.length;
    const userLevel = [...USER_LEVELS].reverse().find(level => sessionCount >= level.threshold) || USER_LEVELS[0];

    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in-up text-left">
            <div className="mb-4">
                <button
                    onClick={onReturnToDashboard}
                    className="flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 7.25H13.25A.75.75 0 0 1 14 8Z" clipRule="evenodd" /></svg>
                    Return to Dashboard
                </button>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8 text-center">My Profile</h1>
            
            <div className="glassmorphism p-6 rounded-2xl mb-6">
                <div className="flex items-center gap-5">
                    <EvolvingAvatar userName={isEditing ? tempName : name} sessionCount={sessionCount} size="large" />
                    {isEditing ? (
                        <div className="space-y-2 flex-grow">
                             <input 
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                className="w-full text-2xl font-bold bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-slate-200"
                                aria-label="Edit user name"
                            />
                             <input 
                                type="email"
                                value={tempEmail}
                                onChange={(e) => setTempEmail(e.target.value)}
                                className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 text-slate-600 dark:text-slate-400"
                                aria-label="Edit user email"
                            />
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{name}</h2>
                            <p className="text-slate-600 dark:text-slate-400">{email}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="glassmorphism p-6 rounded-2xl mb-6">
                 <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Your Growth Journey</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <StatCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10 3.75a2 2 0 100 4 2 2 0 000-4zM10 8.75a2 2 0 100 4 2 2 0 000-4zM10 13.75a2 2 0 100 4 2 2 0 000-4z" /></svg>} 
                        label="Sessions Completed" 
                        value={sessionCount}
                    />
                     <StatCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" /></svg>}
                        label="Wellness Level" 
                        value={userLevel.name}
                    />
                 </div>
            </div>

            <div className="glassmorphism p-6 rounded-2xl mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Session History</h3>
                    {sessionHistory.length > 0 && (
                        <button
                            onClick={handleClearHistory}
                            className="px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-500/10 dark:bg-red-400/10 rounded-lg hover:bg-red-500/20 dark:hover:bg-red-400/20 transition-colors"
                        >
                            Clear History
                        </button>
                    )}
                </div>
                <div className="max-h-60 overflow-y-auto pr-2">
                    <SessionHistoryList history={sessionHistory} />
                </div>
            </div>

            <div className="glassmorphism p-6 rounded-2xl">
                 <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Account Settings</h3>
                 <div className="space-y-4">
                     <div className="flex justify-between items-center">
                         <div>
                             <p className="font-semibold text-slate-700 dark:text-slate-300">Subscription</p>
                             <p className="text-sm text-slate-500 dark:text-slate-400">Companion Plan</p>
                         </div>
                         <button 
                            onClick={onManageSubscription}
                            className="px-4 py-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-400/10 rounded-lg hover:bg-cyan-500/20 dark:hover:bg-cyan-400/20 transition-colors">
                             Manage
                         </button>
                     </div>
                     <div className="flex justify-between items-center">
                         <div>
                             <p className="font-semibold text-slate-700 dark:text-slate-300">Profile Information</p>
                             <p className="text-sm text-slate-500 dark:text-slate-400">Update your name and email</p>
                         </div>
                         {isEditing ? (
                             <div className="flex gap-2">
                                <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors">
                                     Save
                                 </button>
                                 <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg transition-colors">
                                     Cancel
                                 </button>
                             </div>
                         ) : (
                             <button onClick={handleEdit} className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 bg-slate-500/10 dark:bg-slate-400/10 rounded-lg hover:bg-slate-500/20 dark:hover:bg-slate-400/20 transition-colors">
                                 Edit
                             </button>
                         )}
                     </div>
                 </div>
            </div>

            <div className="mt-6">
                <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-3 font-semibold text-red-600 dark:text-red-400 bg-red-500/10 dark:bg-red-400/10 hover:bg-red-500/20 dark:hover:bg-red-400/20 rounded-lg flex items-center gap-3 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                      <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd"></path>
                      <path fillRule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.75a.75.75 0 000 1.5h9.5A.75.75 0 0019 10z" clipRule="evenodd"></path>
                      <path fillRule="evenodd" d="M15.53 13.03a.75.75 0 00-1.06-1.06l-3 3a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06L13.06 10l2.47-2.47z" clipRule="evenodd"></path>
                    </svg>
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );
};
