
import React from 'react';
import { VISUAL_THEMES, VisualTheme } from '../constants';

interface VisualThemeSelectorProps {
    currentTheme: string;
    onThemeChange: (themeId: string) => void;
}

export const VisualThemeSelector: React.FC<VisualThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
    return (
        <div className="relative">
            <label htmlFor="visual-theme-selector" className="sr-only">Choose a visual theme</label>
            <select
                id="visual-theme-selector"
                value={currentTheme}
                onChange={(e) => onThemeChange(e.target.value)}
                className="appearance-none bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg py-2 pl-3 pr-8 text-sm text-slate-800 dark:text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all cursor-pointer"
                aria-label="Select visual theme"
            >
                {VISUAL_THEMES.map((theme: VisualTheme) => (
                    <option key={theme.id} value={theme.id}>
                        {theme.emoji} {theme.name}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
    );
};
