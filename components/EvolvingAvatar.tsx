import React from 'react';
import { generateAvatar } from '../utils/avatar';
import { USER_LEVELS } from '../constants';

interface EvolvingAvatarProps {
    userName: string;
    sessionCount: number;
    size?: 'small' | 'large';
}

export const EvolvingAvatar: React.FC<EvolvingAvatarProps> = ({ userName, sessionCount, size = 'small' }) => {
    // Find the current level based on session count
    const currentLevel = [...USER_LEVELS].reverse().find(level => sessionCount >= level.threshold) || USER_LEVELS[0];

    const avatarUrl = generateAvatar(userName);

    const sizeClasses = size === 'small' ? 'w-10 h-10 text-xs' : 'w-20 h-20 text-base';
    const iconSizeClasses = size === 'small' ? 'w-4 h-4' : 'w-6 h-6';

    return (
        <div className={`relative flex-shrink-0 ${sizeClasses}`}>
            <img
                src={avatarUrl}
                alt={`${userName}'s Avatar`}
                className={`w-full h-full rounded-full border-2 transition-all duration-300 ${currentLevel.style.borderColor || 'border-white/20'}`}
                style={{
                    boxShadow: currentLevel.style.glowColor ? `0 0 12px ${currentLevel.style.glowColor}` : 'none',
                }}
            />
            {currentLevel.icon && (
                <div 
                    className={`absolute -bottom-1 -right-1 ${iconSizeClasses} bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center ring-2 ring-slate-50 dark:ring-slate-900`}
                >
                    {currentLevel.icon}
                </div>
            )}
        </div>
    );
};
