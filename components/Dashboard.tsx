import React from 'react';
import { SessionHistoryItem, ActiveView } from '../types';
import { SessionHistoryList } from './SessionHistoryList';
import { MoodStory } from './MoodStory';

interface DashboardProps {
    userName: string;
    sessionHistory: SessionHistoryItem[];
    onNavigate: (view: ActiveView) => void;
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; className?: string }> = ({ icon, label, value, className = '' }) => (
    <div className={`glassmorphism p-4 rounded-xl flex items-center gap-4 ${className}`}>
        <div className="w-10 h-10 flex items-center justify-center bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-500 dark:text-cyan-400 rounded-full" aria-hidden="true">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{value}</p>
        </div>
    </div>
);

const ActionCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; }> = ({ icon, title, description, onClick }) => (
    <button
        onClick={onClick}
        className="glassmorphism p-6 rounded-2xl w-full text-left flex items-start gap-5 group hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
    >
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-fuchsia-600 text-white rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">{title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>
    </button>
);

export const Dashboard: React.FC<DashboardProps> = ({ userName, sessionHistory, onNavigate }) => {
    return (
        <div className="w-full animate-fade-in-up text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-fuchsia-500">{userName}!</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Ready to find your calm today?</p>
            
            <MoodStory history={sessionHistory} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <ActionCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path d="M10 3.75a2 2 0 100 4 2 2 0 000-4zM10 8.75a2 2 0 100 4 2 2 0 000-4zM10 13.75a2 2 0 100 4 2 2 0 000-4z" /></svg>}
                    title="Create New"
                    description="Craft a MoodScape, start a Resilience Quest, or build a Vision Board."
                    onClick={() => onNavigate('create')}
                />
                 <ActionCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H8.06l-2.47 2.47a.75.75 0 01-1.06-1.06L6.94 13H1.75a.75.75 0 0 1-.75-.75V2.75zm1.5 0v7.5h11V2.75H2.5z" clipRule="evenodd" /></svg>}
                    title="Mindful Chat"
                    description="Talk with Mitra, your supportive AI companion, in a safe space."
                    onClick={() => onNavigate('chat')}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <StatCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M10 3.75a2 2 0 100 4 2 2 0 000-4zM10 8.75a2 2 0 100 4 2 2 0 000-4zM10 13.75a2 2 0 100 4 2 2 0 000-4z" /></svg>} 
                    label="Activities Logged" 
                    value={sessionHistory.length.toString()}
                />
                 <StatCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" /></svg>}
                    label="Mindful Minutes" 
                    value="1,240"
                    className="hidden" // Hiding until this is dynamic
                />
            </div>

            <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Recent Activity</h2>
                <div className="max-h-60 overflow-y-auto pr-2">
                    <SessionHistoryList history={sessionHistory} limit={5} />
                </div>
            </div>
        </div>
    );
};
