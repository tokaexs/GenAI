import React from 'react';
import { SessionHistoryItem } from '../types';

interface SessionHistoryListProps {
  history: SessionHistoryItem[];
  limit?: number; // Optional limit for dashboard view
}

export const SessionHistoryList: React.FC<SessionHistoryListProps> = ({ history, limit }) => {
    const itemsToDisplay = limit ? history.slice(0, limit) : history;
    
    if (history.length === 0) {
        return (
            <div className="text-center text-slate-500 dark:text-slate-400 py-4">
                Your past MoodScape sessions will appear here.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {itemsToDisplay.map((item, index) => (
                <div key={index} className="bg-slate-200/50 dark:bg-slate-900/50 p-3 rounded-lg animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        {new Date(item.date).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                    </p>
                    <p className="font-semibold text-slate-700 dark:text-slate-300 italic">"{item.affirmation}"</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 capitalize">
                        Feeling: <span className="font-medium">{item.mood}</span> {item.context && `- ${item.context}`}
                    </p>
                </div>
            ))}
        </div>
    );
};