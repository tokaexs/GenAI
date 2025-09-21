import React from 'react';
import { ActiveView } from '../types';

interface CreatePageProps {
    onNavigate: (view: ActiveView) => void;
}

const ActivityCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
    <button
        onClick={onClick}
        className="glassmorphism p-6 rounded-2xl w-full text-left flex flex-col sm:flex-row items-start gap-5 group hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
    >
        <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-fuchsia-600 text-white rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400">{description}</p>
        </div>
    </button>
);

export const CreatePage: React.FC<CreatePageProps> = ({ onNavigate }) => {
    return (
        <div className="w-full animate-fade-in-up text-left">
             <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                    Create a New Experience
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    Choose an activity to build resilience, find calm, or envision your future.
                </p>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto">
                <ActivityCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 2.25a.75.75 0 01.75.75v.518a12 12 0 018.086 8.086h.518a.75.75 0 010 1.5h-.518a12 12 0 01-8.086 8.086v.518a.75.75 0 01-1.5 0v-.518a12 12 0 01-8.086-8.086H2.25a.75.75 0 010-1.5h.518A12 12 0 0110.854 3.518V3a.75.75 0 01.75-.75zM12 6a6 6 0 100 12 6 6 0 000-12zM12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" /></svg>}
                    title="MoodScape Session"
                    description="Create a personalized multi-sensory session with visuals, narration, and sound to find your calm."
                    onClick={() => onNavigate('moodscape_creation')}
                />
                 <ActivityCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l2.06-9.262H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" /></svg>}
                    title="Resilience Quest"
                    description="Describe a challenge you're facing and embark on a short, interactive story to practice coping strategies."
                    onClick={() => onNavigate('resilience_quest')}
                />
                 <ActivityCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V8.25L10.5 1.5z" /><path d="M10.5 1.5V6a1.5 1.5 0 001.5 1.5h4.5" /><path d="M12.983 12.724a.75.75 0 10-1.06-1.06l-1.536 1.536-.62-1.24a.75.75 0 00-1.342.67l.94 1.88a.75.75 0 00.67.47h3.75a.75.75 0 000-1.5h-2.327l1.058-1.056z" /></svg>}
                    title="Future Vision Board"
                    description="Write down your dreams and goals, and let AI create an inspiring piece of art to motivate you."
                    onClick={() => onNavigate('vision_board')}
                />
            </div>
        </div>
    );
};
