import React, { useState } from 'react';
import { generateImage, generateVisionBoardPrompt } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';

export const FutureVisionBoard: React.FC = () => {
    const [goals, setGoals] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imagePrompt, setImagePrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!goals.trim()) return;
        setIsLoading(true);
        setError(null);
        setImageUrl(null);
        try {
            const prompt = await generateVisionBoardPrompt(goals);
            setImagePrompt(prompt);
            const url = await generateImage(prompt);
            setImageUrl(url);
        } catch (err) {
            console.error(err);
            setError("Sorry, we couldn't create your vision board right now. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    if (isLoading) {
        return <LoadingSpinner message="Envisioning your future..." />;
    }

    if (imageUrl) {
        return (
            <div className="w-full text-center animate-fade-in">
                <h2 className="text-2xl font-bold mb-4">Your Future Vision</h2>
                <img src={imageUrl} alt="AI-generated vision board" className="w-full aspect-video rounded-xl shadow-lg mb-4" />
                <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-4 max-w-xl mx-auto">Prompt: "{imagePrompt}"</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <a href={imageUrl} download="my-vision-board.jpg" className="main-cta-button !max-w-xs">
                        Save Vision
                    </a>
                    <button onClick={() => setImageUrl(null)} className="w-full max-w-xs mx-auto font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 glassmorphism text-slate-800 dark:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-700/50">
                        Create Another
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in-up text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                Future Vision Board
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
                What are your dreams and goals? Write them down and we'll create an inspiring visual for you.
            </p>

            <div className="space-y-6">
                <textarea
                    rows={6}
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="e.g., 'I want to become a confident public speaker, travel to Japan, and learn to play the guitar...'"
                    className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-lg"
                    aria-label="Your goals and dreams"
                />
                 {error && <p role="alert" className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
                <button
                    onClick={handleGenerate}
                    disabled={!goals.trim()}
                    className="main-cta-button"
                >
                    Create My Vision
                </button>
            </div>
        </div>
    );
};
