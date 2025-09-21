import React, { useState, useEffect, useRef } from 'react';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
    const [feedbackType, setFeedbackType] = useState('suggestion');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Reset state when modal is closed externally
        if (!isOpen) {
            setTimeout(() => {
                setIsSubmitted(false);
                setMessage('');
                setFeedbackType('suggestion');
            }, 300); // Delay reset to allow for closing animation
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            const modalElement = modalRef.current;
            if (!modalElement) return;

            const focusableElements = modalElement.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            firstElement?.focus();

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) { // shift + tab
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement?.focus();
                        }
                    } else { // tab
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement?.focus();
                        }
                    }
                } else if (e.key === 'Escape') {
                    onClose();
                }
            };

            modalElement.addEventListener('keydown', handleKeyDown);

            return () => {
                modalElement.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        // In a real app, you would send this to a server
        console.log('Feedback Submitted:', {
            type: feedbackType,
            message: message,
        });

        setIsSubmitted(true);

        // Close the modal after a delay
        setTimeout(() => {
            onClose();
        }, 2500);
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
                aria-labelledby="feedback-modal-title"
                className="glassmorphism rounded-2xl border border-slate-300/20 dark:border-slate-700/20 shadow-2xl p-8 max-w-md w-11/12 animate-modal-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 id="feedback-modal-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100">Share Your Feedback</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">We'd love to hear from you!</p>
                    </div>
                     <button
                        onClick={onClose}
                        className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                {isSubmitted ? (
                    <div role="status" className="text-center py-8 animate-fade-in">
                        <div className="w-16 h-16 mx-auto bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Thank You!</h3>
                        <p className="text-slate-600 dark:text-slate-400">Your feedback helps us improve.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1" htmlFor="feedback-type">Feedback Type</label>
                            <select
                                id="feedback-type"
                                value={feedbackType}
                                onChange={(e) => setFeedbackType(e.target.value)}
                                className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
                            >
                                <option value="suggestion">Suggestion</option>
                                <option value="bug">Bug Report</option>
                                <option value="general">General Comment</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1" htmlFor="feedback-message">Message</label>
                            <textarea
                                id="feedback-message"
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
                                placeholder="Tell us what you think..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-600 to-fuchsia-700 hover:from-cyan-500 hover:to-fuchsia-600 text-white font-bold py-3 px-4 rounded-full text-base transition-all duration-300 ease-in-out disabled:opacity-50"
                            disabled={!message.trim()}
                        >
                            Submit Feedback
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};