import React from 'react';

const messages = [
    "Generating your video...",
    "This may take a few minutes...",
    "Animating your calm scene...",
    "Rendering tranquility...",
    "Almost there, your video is being finalized...",
];

export const VideoLoadingModal: React.FC = () => {
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(prevMessage => {
                const currentIndex = messages.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % messages.length;
                return messages[nextIndex];
            });
        }, 3500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center z-50 animate-fade-in"
            role="status"
            aria-live="polite"
        >
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <svg
                    aria-hidden="true"
                    className="animate-spin h-12 w-12 text-cyan-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
                <p className="text-slate-300 text-lg font-medium transition-opacity duration-500">{message}</p>
            </div>
        </div>
    );
};