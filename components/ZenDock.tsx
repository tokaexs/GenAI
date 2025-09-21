import React from 'react';

interface ZenDockProps {
    onOpenReframe: () => void;
    onOpenAbout: () => void;
    onOpenFeedback: () => void;
}

const DockButton: React.FC<{
    onClick: () => void;
    label: string;
    children: React.ReactNode;
}> = ({ onClick, label, children }) => (
    <button
        onClick={onClick}
        aria-label={label}
        className="w-12 h-12 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 transform hover:scale-110"
    >
        {children}
    </button>
);

export const ZenDock: React.FC<ZenDockProps> = ({ onOpenReframe, onOpenAbout, onOpenFeedback }) => {
    return (
        <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
            <div className="glassmorphism rounded-full px-4 py-2 flex items-center justify-center gap-2 shadow-lg animate-fade-in-up">
                <DockButton onClick={onOpenReframe} label="Reframe a Thought">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                        <path d="M10 3.5a.75.75 0 01.75.75v2.536l3.243-1.306a.75.75 0 01.913 1.21l-2.023 5.058a.75.75 0 01-1.385-.554l1.206-3.016-2.204.882a.75.75 0 01-.601-1.352l3.4-3.4a.75.75 0 011.06 1.06l-2.647 2.646 1.32 3.3a.75.75 0 01-1.385.554l-2.023-5.058a.75.75 0 01.09-.7L12.25 5.5v2.25a.75.75 0 01-1.5 0V4.25A.75.75 0 0110 3.5z" />
                        <path d="M5.122 12.862a.75.75 0 01-1.06-1.06l2.646-2.647a.75.75 0 011.06 1.06l-2.646 2.647zM3.5 10a.75.75 0 01.75-.75h.036a.75.75 0 01.685.81l-.223 1.342a.75.75 0 01-1.428-.238l.223-1.342A.75.75 0 013.5 10zM10 15.5a.75.75 0 01-.75.75h-.036a.75.75 0 01-.685-.81l.223-1.342a.75.75 0 111.428.238l-.223 1.342A.75.75 0 0110 15.5z" />
                    </svg>
                </DockButton>

                <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>

                <DockButton onClick={onOpenAbout} label="About MoodScape">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.25 9.75A.75.75 0 019 9h.25a.75.75 0 01.75.75v3.25a.75.75 0 01-1.5 0v-2.5H9a.75.75 0 01-.75-.75zM10 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>
                </DockButton>

                <DockButton onClick={onOpenFeedback} label="Provide Feedback">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path fillRule="evenodd" d="M10 2c-4.418 0-8 3.134-8 7 0 2.033.944 3.863 2.446 5.105a.75.75 0 01-.22 1.196l-.857.428a.75.75 0 00-.54 1.006A9.504 9.504 0 0010 18c4.418 0 8-3.134 8-7s-3.582-7-8-7z" clipRule="evenodd" /></svg>
                </DockButton>
            </div>
        </footer>
    );
};
