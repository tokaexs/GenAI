
import React, { useState, useEffect } from 'react';

const EMOJIS = ['✨', '🔮', '🧘', '🌿', '🎨', '🌌', '🌊', '☀️', '🌙', '🌟', '🕊️', '🦋'];

export const EmojiSpinner: React.FC = () => {
    const [currentEmoji, setCurrentEmoji] = useState(EMOJIS[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
        }, 100); // Change emoji every 0.1 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return (
        <span 
            className="text-xl w-6 h-6 flex items-center justify-center"
            aria-label="Loading animation"
            role="img"
        >
            {currentEmoji}
        </span>
    );
};
