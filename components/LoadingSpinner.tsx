
import React from 'react';

const messages = [
    "Crafting your calm...",
    "Finding your focus...",
    "Generating serenity...",
    "Building your escape...",
    "A moment of peace is on its way...",
    "Brewing a tranquil thought...",
];

interface LoadingSpinnerProps {
    message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message: customMessage }) => {
    const [message, setMessage] = React.useState(customMessage || messages[0]);

    React.useEffect(() => {
        if (customMessage) {
            setMessage(customMessage);
            return; // Don't start interval if a custom message is provided
        }

        const intervalId = setInterval(() => {
            setMessage(messages[Math.floor(Math.random() * messages.length)]);
        }, 2500);

        return () => clearInterval(intervalId);
    }, [customMessage]);

    return (
        <div role="status" className="flex flex-col items-center justify-center gap-4 text-center">
            <svg
                aria-hidden="true"
                className="animate-spin h-12 w-12 text-cyan-500 dark:text-cyan-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24"
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
            <p className="text-slate-600 dark:text-slate-300 text-lg font-medium transition-opacity duration-500">{message}</p>
        </div>
    );
};
