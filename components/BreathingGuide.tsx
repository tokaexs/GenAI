import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BreathingPattern, NamedBreathingPattern } from '../types';
import { DEFAULT_PATTERNS, findOrCreateNamedPattern } from '../constants/breathingPatterns';

interface BreathingGuideProps {
    pattern: BreathingPattern;
    title: string;
    onClose: () => void;
}

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'postExhaleHold';
const PHASES: BreathingPhase[] = ['inhale', 'hold', 'exhale', 'postExhaleHold'];
const LOCAL_STORAGE_KEY = 'moodscape_custom_patterns';

const loadCustomPatterns = (): NamedBreathingPattern[] => {
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to load custom patterns:", e);
        return [];
    }
};

const saveCustomPatterns = (patterns: NamedBreathingPattern[]) => {
    try {
        const customPatterns = patterns.filter(p => p.isCustom);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customPatterns));
    } catch (e) {
        console.error("Failed to save custom patterns:", e);
    }
};

export const BreathingGuide: React.FC<BreathingGuideProps> = ({ pattern: initialPattern, title, onClose }) => {
    const [allPatterns, setAllPatterns] = useState<NamedBreathingPattern[]>([]);
    const [currentPattern, setCurrentPattern] = useState<NamedBreathingPattern>(() => findOrCreateNamedPattern(initialPattern, title));
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [countdown, setCountdown] = useState(currentPattern.pattern.inhale);
    const [isEditing, setIsEditing] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    // --- Setup and Teardown ---
    useEffect(() => {
        const customPatterns = loadCustomPatterns();
        const initialNamedPattern = findOrCreateNamedPattern(initialPattern, title);
        
        // Add the initial pattern to the list if it's not a standard default one
        const all = [...DEFAULT_PATTERNS];
        if (!DEFAULT_PATTERNS.some(p => p.name === initialNamedPattern.name)) {
            all.unshift({ ...initialNamedPattern, name: title }); // Use the AI title
        }
        
        setAllPatterns([...all, ...customPatterns]);
        setCurrentPattern(initialNamedPattern);
        
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        return () => {
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, [initialPattern, title]);


    // --- Core Animation Logic ---
    const currentPhase = PHASES[phaseIndex];
    const duration = currentPattern.pattern[currentPhase] || 0;

    const playSound = useCallback((frequency: number, volume: number, duration: number) => {
        const context = audioContextRef.current;
        if (!context) return;
        if (context.state === 'suspended') {
            context.resume();
        }
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, context.currentTime + 0.01);
        oscillator.frequency.setValueAtTime(frequency, context.currentTime);
        oscillator.type = 'sine';
        oscillator.start(context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration);
        oscillator.stop(context.currentTime + duration);
    }, []);

    useEffect(() => {
        if (duration === 0) {
            setPhaseIndex((prev) => (prev + 1) % PHASES.length);
            return;
        }

        if (currentPhase === 'inhale' || currentPhase === 'exhale') playSound(600, 0.2, 0.2);
        else playSound(400, 0.15, 0.15);

        setCountdown(duration);

        const phaseTimer = setInterval(() => {
            setPhaseIndex((prev) => (prev + 1) % PHASES.length);
        }, duration * 1000);

        const countdownTimer = setInterval(() => {
            setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
        }, 1000);

        return () => {
            clearInterval(phaseTimer);
            clearInterval(countdownTimer);
        };
    }, [phaseIndex, duration, currentPattern, playSound, currentPhase]);
    

    // --- User Interaction Handlers ---
    const handleSelectPattern = (pattern: NamedBreathingPattern) => {
        setCurrentPattern(pattern);
        setPhaseIndex(0); // Reset animation
        setIsEditing(false); // Close editor if open
    };
    
    const handlePatternValueChange = (phase: keyof BreathingPattern, value: string) => {
        const numValue = parseInt(value, 10) || 0;
        setCurrentPattern(prev => ({
            ...prev,
            name: `${prev.name.split(' (edited)')[0]} (edited)`,
            pattern: {
                ...prev.pattern,
                [phase]: numValue
            }
        }));
        setPhaseIndex(0);
    };

    const handleSavePattern = () => {
        const name = window.prompt("Enter a name for your custom pattern:", currentPattern.name.replace(' (edited)', ''));
        if (name && name.trim()) {
            const newPattern: NamedBreathingPattern = {
                ...currentPattern,
                name: name.trim(),
                isCustom: true,
            };
            const updatedPatterns = [...allPatterns, newPattern];
            setAllPatterns(updatedPatterns);
            saveCustomPatterns(updatedPatterns);
            setCurrentPattern(newPattern); // Switch to the newly saved pattern
            setIsEditing(false);
        }
    };
    
    const handleDeletePattern = (patternToDelete: NamedBreathingPattern) => {
         if (window.confirm(`Are you sure you want to delete "${patternToDelete.name}"?`)) {
            const updatedPatterns = allPatterns.filter(p => p.name !== patternToDelete.name);
            setAllPatterns(updatedPatterns);
            saveCustomPatterns(updatedPatterns);
            // If the deleted pattern was the current one, switch to the first default
            if (currentPattern.name === patternToDelete.name) {
                setCurrentPattern(DEFAULT_PATTERNS[0]);
                setPhaseIndex(0);
            }
        }
    };

    // --- Accessibility ---
    useEffect(() => {
        const modalElement = modalRef.current;
        if (!modalElement) return;
        const focusableElements = modalElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0] as HTMLElement;
        firstElement?.focus();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // --- Render ---
    const phaseText: Record<BreathingPhase, string> = { inhale: 'Inhale', hold: 'Hold', exhale: 'Exhale', postExhaleHold: 'Hold' };
    const orbScale = currentPhase === 'inhale' ? 1 : 0.5;
    const orbColor = currentPhase === 'inhale' ? 'rgba(56, 189, 248, 0.5)' : 'rgba(192, 132, 252, 0.5)';
    
    const EditorSlider: React.FC<{ phase: keyof BreathingPattern; label: string }> = ({ phase, label }) => (
        <div className="flex-1 min-w-[120px]">
            <label htmlFor={phase} className="block text-xs font-medium text-slate-300 capitalize">{label} ({currentPattern.pattern[phase]}s)</label>
            <input
                id={phase}
                type="range"
                min="0"
                max="15"
                step="1"
                value={currentPattern.pattern[phase]}
                onChange={(e) => handlePatternValueChange(phase, e.target.value)}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
        </div>
    );
    
    return (
        <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="breathing-guide-title"
            className="fixed inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center z-50 animate-fade-in"
            onClick={onClose}>
            
            <div className="absolute top-5 right-5 z-20">
                <button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white font-bold p-3 rounded-full transition-colors" aria-label="Close breathing guide">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-grow w-full pt-16 pb-64">
                <h2 id="breathing-guide-title" className="text-3xl font-bold text-slate-100 mb-4 truncate max-w-sm px-4">{currentPattern.name}</h2>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full transition-all duration-1000 ease-in-out" style={{ backgroundColor: orbColor, transform: `scale(${orbScale * 1.5})`, filter: 'blur(40px)', transitionDuration: `${duration}s` }} aria-hidden="true" />
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl transition-transform ease-in-out flex items-center justify-center" style={{ transform: `scale(${orbScale})`, transition: `transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1)` }} aria-hidden="true">
                        <div className="text-center" aria-live="polite" aria-atomic="true">
                            <p className="text-5xl font-bold text-white transition-opacity duration-500" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>{countdown}</p>
                            <p className="text-2xl text-slate-300 capitalize">{phaseText[currentPhase]}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/30 backdrop-blur-sm" onClick={e => e.stopPropagation()}>
                {isEditing && (
                    <div className="w-full max-w-2xl mx-auto mb-4 p-4 glassmorphism rounded-xl animate-fade-in" style={{ animationDuration: '0.3s' }}>
                        <div className="flex flex-wrap gap-4 items-center justify-center mb-4">
                            <EditorSlider phase="inhale" label="Inhale" />
                            <EditorSlider phase="hold" label="Hold" />
                            <EditorSlider phase="exhale" label="Exhale" />
                            <EditorSlider phase="postExhaleHold" label="Hold" />
                        </div>
                         <div className="flex justify-center gap-4">
                            <button onClick={handleSavePattern} className="px-4 py-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 rounded-md transition-colors">
                                Save as New Pattern
                            </button>
                            <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium text-slate-300 bg-white/10 hover:bg-white/20 rounded-md transition-colors">
                                Done
                            </button>
                        </div>
                    </div>
                )}
                
                <div className="flex items-center justify-center gap-4">
                    <div className="flex-grow overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
                        {allPatterns.map(p => (
                            <div key={p.name} className="inline-block mr-3 group relative">
                                <button onClick={() => handleSelectPattern(p)}
                                    aria-pressed={currentPattern.name === p.name}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${currentPattern.name === p.name ? 'bg-cyan-500 text-white' : 'bg-white/10 hover:bg-white/20 text-slate-200'}`}>
                                    {p.name}
                                </button>
                                {p.isCustom && (
                                     <button onClick={() => handleDeletePattern(p)} aria-label={`Delete ${p.name}`} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">
                                        &times;
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setIsEditing(!isEditing)} aria-pressed={isEditing} className="flex-shrink-0 px-4 py-2 text-sm font-medium text-slate-200 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                        {isEditing ? 'Close Editor' : 'Customize'}
                    </button>
                </div>
            </div>
        </div>
    );
};
