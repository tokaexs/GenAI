import React, { useState, useEffect, useRef } from 'react';
import { generateReframedThoughts } from '../services/geminiService';

interface ReframeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PerspectiveCard: React.FC<{ text: string; index: number }> = ({ text, index }) => {
    return (
        <div 
            className="w-full bg-slate-200/50 dark:bg-slate-700/50 p-4 rounded-lg animate-fade-in-up" 
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <p className="text-slate-700 dark:text-slate-200">{text}</p>
        </div>
    );
};

export const ReframeModal: React.FC<ReframeModalProps> = ({ isOpen, onClose }) => {
    const [thought, setThought] = useState('');
    const [reframes, setReframes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Focus input when modal opens
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            // Reset state when modal closes
            setTimeout(() => {
                setThought('');
                setReframes([]);
                setError('');
                setIsLoading(false);
            }, 300); // Delay to allow animation
        }
    }, [isOpen]);

    // Focus Trap & Escape key
    useEffect(() => {
        if (isOpen) {
            const modalElement = modalRef.current;
            if (!modalElement) return;

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };

            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!thought.trim()) return;

        setIsLoading(true);
        setError('');
        setReframes([]);
        
        try {
            const result = await generateReframedThoughts(thought);
            setReframes(result.reframes);
        } catch (err) {
            console.error(err);
            setError("Sorry, we couldn't generate reframes right now. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in"
            onClick={onClose}
        >
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="reframe-modal-title"
                className="glassmorphism rounded-2xl border border-slate-300/20 dark:border-slate-700/20 shadow-2xl p-8 max-w-lg w-11/12 animate-modal-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 id="reframe-modal-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100">Cognitive Reframing</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Challenge a negative thought and find a new perspective.</p>
                    </div>
                     <button
                        onClick={onClose}
                        className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <form onSubmit={handleGenerate}>
                    <label htmlFor="negative-thought-input" className="sr-only">Your challenging thought</label>
                    <textarea
                        id="negative-thought-input"
                        ref={inputRef}
                        rows={3}
                        value={thought}
                        onChange={(e) => setThought(e.target.value)}
                        className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
                        placeholder="e.g., 'I'm a failure because I made a mistake.'"
                        required
                    />
                    <button
                        type="submit"
                        className="main-cta-button !w-auto !py-3 !px-6 !text-base mt-4"
                        disabled={isLoading || !thought.trim()}
                    >
                        {isLoading ? 'Thinking...' : 'Find New Perspectives'}
                    </button>
                </form>

                {error && <p role="alert" className="text-red-500 dark:text-red-400 text-sm mt-4">{error}</p>}
                
                {reframes.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-300/50 dark:border-slate-700/50">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Alternative Perspectives:</h3>
                        <div className="space-y-3">
                            {reframes.map((reframe, index) => (
                                <PerspectiveCard key={index} text={reframe} index={index} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
