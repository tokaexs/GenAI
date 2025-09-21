import React, { useRef, useEffect } from 'react';
import { Plan } from './PaymentModal';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: (plan: Plan) => void;
}

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-cyan-500 dark:text-cyan-400" aria-hidden="true">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
    </svg>
);


export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade }) => {
    const modalRef = useRef<HTMLDivElement>(null);

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

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in"
            onClick={onClose}
        >
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="upgrade-modal-title"
                className="glassmorphism rounded-2xl border border-cyan-500/20 dark:border-cyan-400/20 shadow-2xl p-8 max-w-md w-11/12 text-center animate-modal-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-white rounded-full flex items-center justify-center shadow-lg" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.75.75v13.5a.75.75 0 01-1.5 0V5.25A.75.75 0 019 4.5zm6.75 3a.75.75 0 00-1.5 0v10.5a.75.75 0 001.5 0V7.5zM3 9.75a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013 9.75zm16.5 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM7.5 12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm3-3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0110.5 9zm9 3a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3z" clipRule="evenodd" />
                    </svg>
                </div>

                <h2 id="upgrade-modal-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Ready for a Deeper Calm?</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">You've created a MoodScape! Unlock unlimited sessions and more with our Companion plan.</p>

                <ul className="space-y-3 text-left mb-8 max-w-xs mx-auto">
                    <li className="flex items-center gap-3">
                        <CheckIcon />
                        <span className="text-slate-700 dark:text-slate-300">Unlimited MoodScapes</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckIcon />
                        <span className="text-slate-700 dark:text-slate-300">Calming Video Generation</span>
                    </li>
                     <li className="flex items-center gap-3">
                        <CheckIcon />
                        <span className="text-slate-700 dark:text-slate-300">Advanced AI Chat Companion</span>
                    </li>
                </ul>

                <div className="flex flex-col gap-3">
                     <button
                        onClick={() => onUpgrade({ name: 'Companion', price: '$9' })}
                        className="w-full bg-gradient-to-r from-cyan-600 to-fuchsia-700 hover:from-cyan-500 hover:to-fuchsia-600 text-white font-bold py-3 px-4 rounded-full text-base transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Upgrade Now
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-2"
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
};