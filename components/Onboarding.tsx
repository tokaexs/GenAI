import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';

interface TourStep {
    targetId: string;
    title: string;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

const TOUR_STEPS: TourStep[] = [
    {
        targetId: 'mood-selector',
        title: '1. Select Your Mood',
        content: 'Start by choosing a mood that best describes how you feel, or tell us more in the text box below.',
        position: 'bottom',
    },
    {
        targetId: 'generate-button',
        title: '2. Create Your Sanctuary',
        content: 'Once you\'re ready, click here to generate a personalized MoodScape session just for you.',
        position: 'top',
    },
    {
        targetId: 'user-menu',
        title: '3. Your Account',
        content: 'Access your profile, settings, and other options from the user menu here.',
        position: 'bottom',
    }
];

interface OnboardingProps {
    onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const currentStep = TOUR_STEPS[stepIndex];

    useLayoutEffect(() => {
        const calculateRect = () => {
            const element = document.querySelector(`[data-tour-id="${currentStep.targetId}"]`);
            if (element) {
                setTargetRect(element.getBoundingClientRect());
            } else {
                if (stepIndex < TOUR_STEPS.length - 1) {
                    setStepIndex(stepIndex + 1);
                } else {
                    onComplete();
                }
            }
        };
        const timer = setTimeout(calculateRect, 100);
        window.addEventListener('resize', calculateRect);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculateRect);
        };
    }, [stepIndex, currentStep.targetId, onComplete]);

    // Focus trap for the tooltip
    useEffect(() => {
        const tooltipElement = tooltipRef.current;
        if (tooltipElement) {
            const focusableElements = tooltipElement.querySelectorAll<HTMLElement>(
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
                    onComplete();
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [stepIndex, targetRect, onComplete]);


    const handleNext = () => {
        if (stepIndex < TOUR_STEPS.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            onComplete();
        }
    };

    const handlePrev = () => {
        if (stepIndex > 0) {
            setStepIndex(stepIndex - 1);
        }
    };
    
    const highlighterStyle: React.CSSProperties = targetRect ? {
        position: 'fixed',
        left: `${targetRect.left - 8}px`,
        top: `${targetRect.top - 8}px`,
        width: `${targetRect.width + 16}px`,
        height: `${targetRect.height + 16}px`,
        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
        borderRadius: '16px',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: 'none',
    } : { display: 'none' };
    
    const tooltipStyle: React.CSSProperties = targetRect ? {
        position: 'fixed',
        left: `${targetRect.left + targetRect.width / 2}px`,
        top: currentStep.position === 'top' ? `${targetRect.top - 16}px` : `${targetRect.bottom + 16}px`,
        transform: `translateX(-50%) ${currentStep.position === 'top' ? 'translateY(-100%)' : ''}`,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 101, // Above backdrop
    } : { display: 'none' };

    return (
        <div className="fixed inset-0 z-[100]">
            <div style={highlighterStyle} />
            {targetRect && (
                <div
                    ref={tooltipRef}
                    style={tooltipStyle}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="onboarding-title"
                    aria-describedby="onboarding-content"
                    className="w-72 max-w-[90vw] glassmorphism rounded-xl p-5 animate-fade-in-up text-left shadow-2xl"
                >
                    <h3 id="onboarding-title" className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">{currentStep.title}</h3>
                    <p id="onboarding-content" className="text-sm text-slate-600 dark:text-slate-300 mb-4">{currentStep.content}</p>
                    <div className="flex justify-between items-center">
                        <button onClick={onComplete} className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:underline">
                            Skip Tour
                        </button>
                        <div className="flex items-center gap-2">
                            {stepIndex > 0 && (
                                <button onClick={handlePrev} className="px-4 py-2 text-sm font-medium bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg transition-colors">
                                    Prev
                                </button>
                            )}
                            <button onClick={handleNext} className="px-4 py-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors">
                                {stepIndex === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};