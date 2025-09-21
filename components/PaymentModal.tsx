import React, { useState, useEffect, useRef } from 'react';

export interface Plan {
    name: string;
    price: string;
}

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPaymentSuccess: () => void;
    plan: Plan | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess, plan }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [cardDetails, setCardDetails] = useState({ name: '', number: '', expiry: '', cvc: '' });
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) {
            // Reset state after closing animation
            setTimeout(() => {
                setIsProcessing(false);
                setIsSuccess(false);
                setCardDetails({ name: '', number: '', expiry: '', cvc: '' });
            }, 300);
        }
    }, [isOpen]);
    
    // Focus Trap & Escape key handling
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
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            setTimeout(() => {
                onPaymentSuccess();
            }, 2000); // Wait 2 seconds on success screen before closing
        }, 1500); // Simulate 1.5 second processing time
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({ ...prev, [name]: value }));
    };

    const priceAmount = plan?.price.replace('$', '');

    const renderContent = () => {
        if (isSuccess) {
            return (
                <div role="status" className="text-center py-8 animate-fade-in">
                    <div className="w-16 h-16 mx-auto bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Payment Successful!</h3>
                    <p className="text-slate-600 dark:text-slate-400">Welcome to the {plan?.name} plan.</p>
                </div>
            );
        }

        return (
             <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1" htmlFor="card-name">Cardholder Name</label>
                    <input type="text" id="card-name" name="name" value={cardDetails.name} onChange={handleInputChange} className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors" placeholder="Alex Doe" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1" htmlFor="card-number">Card Number</label>
                    <input type="text" id="card-number" name="number" value={cardDetails.number} onChange={handleInputChange} className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors" placeholder="0000 0000 0000 0000" required />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1" htmlFor="card-expiry">Expiry</label>
                        <input type="text" id="card-expiry" name="expiry" value={cardDetails.expiry} onChange={handleInputChange} className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors" placeholder="MM/YY" required />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1" htmlFor="card-cvc">CVC</label>
                        <input type="text" id="card-cvc" name="cvc" value={cardDetails.cvc} onChange={handleInputChange} className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors" placeholder="123" required />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-600 to-fuchsia-700 hover:from-cyan-500 hover:to-fuchsia-600 text-white font-bold py-3 px-4 rounded-full text-base transition-all duration-300 ease-in-out disabled:opacity-70 flex items-center justify-center"
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Processing...
                        </>
                    ) : (
                        `Pay $${priceAmount}/month`
                    )}
                </button>
            </form>
        );
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
                aria-labelledby="payment-modal-title"
                className="glassmorphism rounded-2xl border border-slate-300/20 dark:border-slate-700/20 shadow-2xl p-8 max-w-md w-11/12 animate-modal-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                 <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 id="payment-modal-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100">Upgrade to {plan?.name}</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Complete your payment details below.</p>
                    </div>
                     <button
                        onClick={onClose}
                        className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Close"
                        disabled={isProcessing || isSuccess}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};