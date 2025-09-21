import React, { useState } from 'react';
import { QUOTES } from '../constants';
import { triggerHapticFeedback } from '../utils/haptics';

export const Quotes: React.FC = () => {
    const [quotes, setQuotes] = useState<string[]>(QUOTES);
    const [currentQuote, setCurrentQuote] = useState<string>('Recharge with a quote below!');
    const [newQuote, setNewQuote] = useState<string>('');

    const showRandomQuote = () => {
        triggerHapticFeedback('light');
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setCurrentQuote(quotes[randomIndex]);
    };

    const addNewQuote = () => {
        if (newQuote.trim()) {
            triggerHapticFeedback('medium');
            const updatedQuotes = [...quotes, newQuote.trim()];
            setQuotes(updatedQuotes);
            setCurrentQuote(newQuote.trim());
            setNewQuote('');
        }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNewQuote();
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto mt-12 glassmorphism p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-center mb-4 text-slate-800 dark:text-slate-200">A Moment for Motivation</h3>
            <div className="min-h-[80px] bg-slate-200/50 dark:bg-slate-900/50 rounded-lg flex items-center justify-center p-4 text-center mb-5 border border-slate-300 dark:border-slate-700">
                <p className="text-lg italic text-slate-700 dark:text-slate-300" aria-live="polite">"{currentQuote}"</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <label htmlFor="add-quote-input" className="sr-only">Add your own quote</label>
                <input
                    type="text"
                    id="add-quote-input"
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add your own quote..."
                    className="flex-grow bg-slate-100/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-full p-3 px-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                />
                <button
                    onClick={addNewQuote}
                    className="bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-full transition-colors disabled:opacity-50"
                    disabled={!newQuote.trim()}
                >
                    Add Quote
                </button>
            </div>
             <button
                onClick={showRandomQuote}
                className="w-full bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 dark:from-slate-600 dark:to-slate-700 dark:hover:from-slate-500 dark:hover:to-slate-600 text-white font-bold py-3 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
                Get a Random Quote
            </button>
        </div>
    );
};