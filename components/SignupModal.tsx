import React, { useState, useEffect, useRef } from 'react';

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSignupSuccess: () => void;
    onSwitchToLogin: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSignupSuccess, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        // Mock validation
        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        // Mock signup success
        console.log('Signing up with:', { name, email, password });
        onSignupSuccess();
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
                aria-labelledby="signup-modal-title"
                className="glassmorphism rounded-2xl border border-slate-300/20 dark:border-slate-700/20 shadow-2xl p-8 max-w-sm w-11/12 animate-modal-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 id="signup-modal-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100">Create Account</h2>
                     <button
                        onClick={onClose}
                        className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {error && <p role="alert" className="text-red-500 dark:text-red-400 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSignup} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1" htmlFor="signup-name">Name</label>
                        <input
                            type="text"
                            id="signup-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1" htmlFor="signup-email">Email</label>
                        <input
                            type="email"
                            id="signup-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1" htmlFor="signup-password">Password</label>
                        <input
                            type="password"
                            id="signup-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
                            placeholder="Minimum 8 characters"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-600 to-fuchsia-700 hover:from-cyan-500 hover:to-fuchsia-600 text-white font-bold py-3 px-4 rounded-full text-base transition-all duration-300 ease-in-out disabled:opacity-50 relative overflow-hidden gradient-button-shine"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
                    Already have an account?{' '}
                    <button onClick={onSwitchToLogin} className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
};