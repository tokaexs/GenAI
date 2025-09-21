import React, { useState } from 'react';
import { generateResilienceQuest } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';

interface Choice {
    text: string;
    feedback: string;
}

interface Quest {
    title: string;
    scenario: string;
    choices: Choice[];
}

export const ResilienceQuest: React.FC = () => {
    const [challenge, setChallenge] = useState('');
    const [quest, setQuest] = useState<Quest | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleStartQuest = async () => {
        if (!challenge.trim()) return;
        setIsLoading(true);
        setError(null);
        setQuest(null);
        setFeedback(null);
        try {
            const result = await generateResilienceQuest(challenge);
            setQuest(result);
        } catch (err) {
            console.error(err);
            setError("Sorry, we couldn't start your quest right now. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleChoice = (choice: Choice) => {
        setFeedback(choice.feedback);
    };

    const handleReset = () => {
        setChallenge('');
        setQuest(null);
        setFeedback(null);
        setError(null);
    };

    if (isLoading) {
        return <LoadingSpinner message="Building your quest..." />;
    }
    
    if (quest) {
        return (
            <div className="w-full max-w-2xl mx-auto text-center animate-fade-in">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{quest.title}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{quest.scenario}</p>
                
                {feedback ? (
                    <div className="glassmorphism p-6 rounded-xl animate-fade-in">
                        <h3 className="text-xl font-bold mb-2">Feedback</h3>
                        <p className="text-slate-700 dark:text-slate-300 mb-4">{feedback}</p>
                        <button onClick={handleReset} className="main-cta-button !max-w-xs">
                            Start a New Quest
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h3 className="font-semibold">What do you do?</h3>
                        {quest.choices.map((choice, index) => (
                            <button
                                key={index}
                                onClick={() => handleChoice(choice)}
                                className="w-full text-left p-4 glassmorphism rounded-lg transition-all duration-200 hover:bg-cyan-500/10 dark:hover:bg-cyan-400/10 hover:ring-2 ring-cyan-500"
                            >
                                {choice.text}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in-up text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                Resilience Quest
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
                Face a challenge in a safe space. Describe a situation, and we'll create a mini-game to help you practice.
            </p>

            <div className="space-y-6">
                <textarea
                    rows={4}
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    placeholder="e.g., 'I feel stressed about my upcoming exams' or 'I'm nervous about a conversation with a friend...'"
                    className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-lg"
                    aria-label="Describe your challenge"
                />
                 {error && <p role="alert" className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
                <button
                    onClick={handleStartQuest}
                    disabled={!challenge.trim()}
                    className="main-cta-button"
                >
                    Start Quest
                </button>
            </div>
        </div>
    );
};
