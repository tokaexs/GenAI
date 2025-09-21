import React, { useRef, useEffect } from 'react';
import { HELPLINE_INFO } from '../constants';

interface SafetyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose }) => {
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
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="safety-modal-title"
                aria-describedby="safety-modal-description"
                className="bg-slate-100 dark:bg-slate-800 rounded-2xl border border-red-400/50 dark:border-red-500/50 shadow-2xl p-8 max-w-lg w-11/12 text-center animate-modal-scale-in"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <h2 id="safety-modal-title" className="text-2xl font-bold text-red-500 dark:text-red-400 mb-4">{HELPLINE_INFO.title}</h2>
                <p id="safety-modal-description" className="text-slate-700 dark:text-slate-300 mb-6">{HELPLINE_INFO.message}</p>
                <div className="space-y-4">
                    {HELPLINE_INFO.resources.map(resource => (
                        <div key={resource.name} className="bg-slate-200 dark:bg-slate-700/80 p-4 rounded-lg">
                            <p className="text-slate-800 dark:text-slate-200 font-semibold">{resource.name}</p>
                            <a href={`tel:${resource.number}`} className="text-cyan-600 dark:text-cyan-400 text-xl font-bold tracking-wider hover:underline">{resource.number}</a>
                        </div>
                    ))}
                </div>
                <button
                    onClick={onClose}
                    className="mt-8 bg-slate-500 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
};