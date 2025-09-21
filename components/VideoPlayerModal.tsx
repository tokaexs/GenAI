import React, { useEffect, useRef } from 'react';

interface VideoPlayerModalProps {
    videoUrl: string;
    onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ videoUrl, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Focus trap and Escape key handling
    useEffect(() => {
        const modalElement = modalRef.current;
        if (!modalElement) return;

        // Focus the video element itself to allow playback controls to be used immediately
        videoRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
            // Basic focus trap - keep focus on video or close button
            if (event.key === 'Tab') {
                // Since video controls are complex, a simple trap is hard.
                // We'll just prevent tabbing out of the modal container.
                if (!modalElement.contains(document.activeElement)) {
                    videoRef.current?.focus();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
             if (videoRef.current) {
                videoRef.current.pause();
            }
        };
    }, [onClose]);

    return (
        <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Calming video player"
            className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-auto aspect-video rounded-lg shadow-2xl bg-black"
                >
                    Your browser does not support the video tag.
                </video>

                 <button
                    onClick={onClose}
                    className="absolute -top-2 -right-2 bg-white/20 hover:bg-white/30 text-white font-bold p-3 rounded-full transition-colors"
                    aria-label="Close video player"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    );
};