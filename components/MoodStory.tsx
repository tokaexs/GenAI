import React from 'react';
import { SessionHistoryItem } from '../types';
import { MOODS } from '../constants';

interface MoodStoryProps {
    history: SessionHistoryItem[];
}

export const MoodStory: React.FC<MoodStoryProps> = ({ history }) => {
    if (history.length === 0) {
        return null; // Don't show the component if there's no history
    }

    const getMoodSummary = () => {
        const moodCounts: { [key: string]: number } = {};
        history.forEach(item => {
            const moodKey = item.mood.toLowerCase();
            moodCounts[moodKey] = (moodCounts[moodKey] || 0) + 1;
        });

        const sortedMoods = Object.entries(moodCounts).sort((a, b) => b[1] - a[1]);
        
        if (sortedMoods.length === 0) {
            return "You haven't logged any specific moods recently, but you're taking steps to be mindful. Keep it up!";
        }

        const primaryMood = sortedMoods[0][0];
        const primaryMoodData = MOODS.find(m => m.value.toLowerCase() === primaryMood);
        const primaryMoodName = primaryMoodData ? primaryMoodData.name : primaryMood;

        if (sortedMoods.length === 1) {
            return `This past week, you've often felt ${primaryMoodName}. Acknowledging your feelings is a great step.`;
        }
        
        const secondaryMood = sortedMoods[1][0];
        const secondaryMoodData = MOODS.find(m => m.value.toLowerCase() === secondaryMood);
        const secondaryMoodName = secondaryMoodData ? secondaryMoodData.name : secondaryMood;

        return `It looks like you've mainly felt ${primaryMoodName} recently, with some moments of feeling ${secondaryMoodName}. It's great that you're checking in with yourself.`;
    };

    const moodSummary = getMoodSummary();

    return (
        <div className="glassmorphism p-6 rounded-2xl w-full text-left flex flex-col sm:flex-row items-start gap-5 mb-8">
             <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl shadow-lg" aria-hidden="true">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A9.707 9.707 0 006 21a9.735 9.735 0 003.25-.555.75.75 0 00.5-.707V5.24a.75.75 0 00-.5-.707z" /><path d="M12.75 4.533A9.707 9.707 0 0018 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A9.707 9.707 0 0018 21a9.735 9.735 0 003.25-.555.75.75 0 00.5-.707V5.24a.75.75 0 00-.5-.707z" /></svg>
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">Your Weekly Mood Story</h3>
                <p className="text-slate-600 dark:text-slate-400">
                   {moodSummary}
                </p>
            </div>
        </div>
    );
};
