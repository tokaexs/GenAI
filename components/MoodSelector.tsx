import React, { useState } from 'react';
import { MOODS } from '../constants';
import { Language, MoodInput } from '../types';
import { triggerHapticFeedback } from '../utils/haptics';
import { EmojiSpinner } from './EmojiSpinner';
import { useTranslations } from '../utils/i18n';

interface MoodSelectorProps {
    onGenerate: (moodInput: MoodInput) => void;
    isLoading: boolean;
    language: Language;
}

const colors = [
    { name: 'Rose', value: '#fda4af', dark: 'bg-rose-400', light: 'bg-rose-300' },
    { name: 'Sky', value: '#7dd3fc', dark: 'bg-sky-400', light: 'bg-sky-300' },
    { name: 'Mint', value: '#6ee7b7', dark: 'bg-emerald-400', light: 'bg-emerald-300' },
    { name: 'Gold', value: '#fde047', dark: 'bg-yellow-400', light: 'bg-yellow-300' },
    { name: 'Lilac', value: '#d8b4fe', dark: 'bg-purple-400', light: 'bg-purple-300' },
    { name: 'Stone', value: '#d6d3d1', dark: 'bg-stone-400', light: 'bg-stone-300' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onGenerate, isLoading, language }) => {
    const [selectedMood, setSelectedMood] = useState<string>('');
    const [context, setContext] = useState<string>('');
    const [intensity, setIntensity] = useState<number>(50);
    const [selectedColor, setSelectedColor] = useState<string>('');

    const { t } = useTranslations(language);

    const handleMoodClick = (moodValue: string) => {
        triggerHapticFeedback();
        setSelectedMood(moodValue);
    };

    const handleColorClick = (colorValue: string) => {
        triggerHapticFeedback();
        setSelectedColor(colorValue);
    };

    const handleSubmit = () => {
        if (!selectedMood && !context) return;
        triggerHapticFeedback('heavy');
        onGenerate({
            mood: selectedMood || 'as described',
            context: context,
            intensity: intensity,
            color: selectedColor || 'not specified'
        });
    };

    return (
        <div className="w-full max-w-3xl mx-auto text-left">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                    Create your MoodScape
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Tell us how you're feeling to begin your personalized session.
                </p>
            </div>

            {/* Step 1: Mood Emojis */}
            <div className="mb-8">
                <label className="block text-slate-700 dark:text-slate-300 text-lg font-semibold mb-4">1. How are you feeling?</label>
                <div className="flex justify-center items-center gap-3 sm:gap-4 flex-wrap">
                    {MOODS.map((mood) => (
                        <button
                            key={mood.name}
                            onClick={() => handleMoodClick(mood.value)}
                            aria-pressed={selectedMood === mood.value}
                            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none ring-2 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900/50 group ${
                                selectedMood === mood.value
                                    ? 'bg-slate-200/80 dark:bg-slate-700/80 ring-cyan-500 dark:ring-cyan-400'
                                    : 'bg-white/80 dark:bg-slate-800/80 ring-slate-300 dark:ring-slate-600/80 hover:ring-cyan-500/70 dark:hover:ring-cyan-400/70'
                            }`}
                        >
                            <span className="text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{mood.emoji}</span>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{mood.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Step 2: Intensity Slider */}
            <div className="mb-8">
                <label htmlFor="intensity-slider" className="block text-slate-700 dark:text-slate-300 text-lg font-semibold mb-4">2. How strong is this feeling?</label>
                <input
                    id="intensity-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={intensity}
                    onChange={(e) => setIntensity(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                    <span>A little</span>
                    <span>Moderately</span>
                    <span>A lot</span>
                </div>
            </div>

            {/* Step 3: Color Palette */}
            <div className="mb-8">
                 <label className="block text-slate-700 dark:text-slate-300 text-lg font-semibold mb-4">3. Which color feels like you right now?</label>
                 <div className="flex justify-center items-center gap-4 flex-wrap">
                    {colors.map(color => (
                        <button
                            key={color.name}
                            onClick={() => handleColorClick(color.name)}
                            aria-label={color.name}
                            aria-pressed={selectedColor === color.name}
                            className={`w-12 h-12 rounded-full transition-all duration-200 transform hover:scale-110 focus:outline-none ring-2 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900/50 ${color.dark} ${color.light} ${
                                selectedColor === color.name ? 'ring-cyan-500 dark:ring-cyan-400' : 'ring-transparent'
                            }`}
                        />
                    ))}
                 </div>
            </div>

            {/* Step 4: Context Textarea */}
            <div className="mb-8">
                <label htmlFor="context-input" className="block text-slate-700 dark:text-slate-300 text-lg font-semibold mb-3">
                    4. Want to share more? (optional)
                </label>
                <textarea
                    id="context-input"
                    rows={3}
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder={t('tellMeMorePlaceholder')}
                    className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={isLoading || (!selectedMood && !context)}
                className="main-cta-button"
                data-tour-id="generate-button"
            >
                {isLoading ? (
                    <>
                        <EmojiSpinner />
                        <span>{t('craftingYourEscape')}</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6" aria-hidden="true"><path fillRule="evenodd" d="M9.422 3.422a.75.75 0 01.034 1.06l-2.162 2.162a.75.75 0 01-1.06-1.06L8.362 3.456a.75.75 0 011.06.034zM4.53 7.217a.75.75 0 011.06-1.06l2.162 2.162a.75.75 0 11-1.06 1.06L4.53 7.217zM10 18a.75.75 0 01-.75-.75V14.5a.75.75 0 011.5 0v2.75A.75.75 0 0110 18zM10.156 3.016a.75.75 0 01.37.962l-2.023 6.07a.75.75 0 01-1.401-.468l2.023-6.07a.75.75 0 011.03-.494zM15.47 7.217a.75.75 0 011.06-1.06l2.162 2.162a.75.75 0 11-1.06 1.06l-2.162-2.162zM12.783 4.53a.75.75 0 011.06-1.06l2.162 2.162a.75.75 0 01-1.06 1.06L12.783 4.53zM18 10a.75.75 0 01-.75.75h-2.75a.75.75 0 010-1.5H17.25A.75.75 0 0118 10zM12.923 15.346a.75.75 0 011.06-1.06l2.162 2.162a.75.75 0 01-1.06 1.06l-2.162-2.162zM4.654 12.923a.75.75 0 011.06-1.06L7.875 14.025a.75.75 0 01-1.06 1.06L4.654 12.923zM2 10a.75.75 0 01.75-.75h2.75a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" /></svg>
                        <span>{t('createMyMoodscape')}</span>
                    </>
                )}
            </button>
        </div>
    );
};
