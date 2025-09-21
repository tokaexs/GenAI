import React, { useState, useEffect, useRef } from 'react';
import { TherapyBundle, Language } from '../types';
import { triggerHapticFeedback } from '../utils/haptics';
import { BreathingGuide } from './BreathingGuide';
import { generateVideo } from '../services/geminiService';
import { VideoLoadingModal } from './VideoLoadingModal';
import { VideoPlayerModal } from './VideoPlayerModal';
import { useTranslations } from '../utils/i18n';

interface TherapySessionProps {
    bundle: TherapyBundle;
    onReset: () => void;
    language: Language;
    onShareToGallery: (imageUrl: string, affirmation: string) => void;
}

const ActionButton: React.FC<{
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
    href?: string;
    download?: boolean;
    disabled?: boolean;
}> = ({ icon, text, onClick, href, download, disabled = false }) => {
    const commonClasses = "flex items-center justify-center gap-2 glassmorphism font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/80 dark:hover:bg-slate-800/80 shadow-md hover:shadow-lg text-slate-800 dark:text-slate-100";
    const disabledClasses = "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-transparent";
    
    const handleClick = () => {
        if(disabled) return;
        triggerHapticFeedback();
        if (onClick) {
            onClick();
        }
    }

    if (href) {
        return (
            <a href={href} download={download ? "moodscape-wallpaper.jpg" : undefined} className={`${commonClasses} ${disabledClasses}`} onClick={handleClick}>
                {icon}
                {text}
            </a>
        );
    }
    return (
        <button onClick={handleClick} className={`${commonClasses} ${disabledClasses}`} disabled={disabled}>
            {icon}
            {text}
        </button>
    );
};

export const TherapySession: React.FC<TherapySessionProps> = ({ bundle, onReset, language, onShareToGallery }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showBreathingGuide, setShowBreathingGuide] = useState(false);
    const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoError, setVideoError] = useState<string | null>(null);
    const [isPlayingSound, setIsPlayingSound] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const { t } = useTranslations(language);

    // Cleanup speech synthesis and audio on component unmount
    useEffect(() => {
        const audio = audioRef.current;
        return () => {
            if (window.speechSynthesis && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
            }
            if (audio) {
                audio.pause();
            }
        };
    }, [videoUrl]);

    const handleToggleNarration = () => {
        if (!('speechSynthesis' in window)) {
            alert("Sorry, your browser doesn't support text-to-speech.");
            return;
        }

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(bundle.narrationScript);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = (event) => {
                console.error("SpeechSynthesisUtterance.onerror", event);
                setIsSpeaking(false);
            };
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };
    
    const handleToggleSound = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play().catch(e => console.error("Audio play failed:", e));
        } else {
            audio.pause();
        }
    };

    const handleGenerateVideo = async () => {
        setIsGeneratingVideo(true);
        setVideoError(null);
        setVideoUrl(null);
        try {
            const url = await generateVideo(bundle.imagePrompt);
            setVideoUrl(url);
        } catch (error) {
            console.error(error);
            setVideoError("Sorry, we couldn't create the video right now. Please try again later.");
        } finally {
            setIsGeneratingVideo(false);
        }
    };
    
    const isBreathingExercise = bundle.microAction.type === 'breathing' && bundle.microAction.pattern;

    return (
        <>
        {bundle.soundscapeUrl && (
            <audio 
                ref={audioRef} 
                src={bundle.soundscapeUrl} 
                loop 
                onPlay={() => setIsPlayingSound(true)} 
                onPause={() => setIsPlayingSound(false)}
                preload="auto"
            />
        )}
        <div className="w-full h-full animate-fade-in flex flex-col">
            <div
                className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 flex flex-col justify-end p-6"
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    role="img"
                    aria-label={bundle.imagePrompt}
                    style={{ 
                        backgroundImage: `url(${bundle.imageUrl})`,
                        animation: 'kenburns 40s ease-in-out infinite',
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="relative z-10 flex flex-col justify-end h-full text-white">
                    <div className="flex-grow flex items-center justify-center text-center">
                        <p 
                            className="text-2xl md:text-4xl font-light italic px-4 animate-fade-in-up" 
                             style={{ textShadow: '0 3px 15px rgba(0,0,0,0.8)', animationDelay: '0.3s' }}
                        >
                            "{bundle.affirmation}"
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-left animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <div className="md:col-span-3 glassmorphism !bg-slate-900/60 p-4 rounded-xl">
                            <h2 className="text-lg font-bold text-cyan-300 mb-2">{t('yourNarratedScene')}</h2>
                            <div className="max-h-32 overflow-y-auto pr-2">
                                <p className="text-slate-200 leading-relaxed font-light">{bundle.narrationScript}</p>
                            </div>
                        </div>

                        <div className="md:col-span-2 glassmorphism !bg-slate-900/60 p-4 rounded-xl">
                             <h2 className="text-lg font-bold text-cyan-300 mb-2">{t('your60SecondAction')}</h2>
                             <div className="max-h-32 overflow-y-auto pr-2">
                                <p className="font-semibold text-slate-100 mb-2">{bundle.microAction.title}</p>
                                <ul className="space-y-2">
                                    {bundle.microAction.steps.map((step, index) => (
                                        <li key={index} className="flex items-start gap-3 text-sm">
                                            <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" aria-hidden="true"></div>
                                            <span className="text-slate-200 font-light">{step}</span>
                                        </li>
                                    ))}
                                </ul>
                                {isBreathingExercise && (
                                     <button onClick={() => {
                                         triggerHapticFeedback('medium');
                                         setShowBreathingGuide(true)
                                        }} className="w-full mt-3 bg-cyan-500/80 hover:bg-cyan-500 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors shadow-lg hover:shadow-cyan-500/50">
                                        {t('startGuidedBreathing')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                 <ActionButton
                    icon={
                         isPlayingSound 
                         ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M5.25 3.155a.75.75 0 00-1.5 0v13.69a.75.75 0 001.5 0v-13.69zM9.75 3.155a.75.75 0 00-1.5 0v13.69a.75.75 0 001.5 0v-13.69z" /></svg>
                         : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M9.492 2.404a.75.75 0 00-1.116.632v13.928a.75.75 0 001.116.632l9.83-6.964a.75.75 0 000-1.264l-9.83-6.964z" /><path d="M3.75 3.155a.75.75 0 00-1.5 0v13.69a.75.75 0 001.5 0v-13.69z" /></svg>
                    }
                    text={isPlayingSound ? "Pause Sound" : "Play Soundscape"}
                    onClick={handleToggleSound}
                 />
                 <ActionButton
                    icon={
                        isSpeaking
                        ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M5.5 5A1.5 1.5 0 004 6.5v7A1.5 1.5 0 005.5 15h9a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0014.5 5h-9z" /></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                    }
                    text={isSpeaking ? t('stopListening') : t('listenToScene')}
                    onClick={handleToggleNarration}
                />
                 <ActionButton
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h13.5A2.25 2.25 0 0019 13.75v-7.5A2.25 2.25 0 0016.75 4H3.25zM10 8a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 0110 8zM7 9.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM13 9.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"></path></svg>}
                    text={t('createCalmingVideo')}
                    onClick={handleGenerateVideo}
                    disabled={isGeneratingVideo}
                />
                <ActionButton
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.839 2.403a.75.75 0 00-1.129-.445l-4.25 2.5a.75.75 0 00.5 1.341L10 8.354V15.5a.75.75 0 001.5 0V4.41l3.41 1.278a.75.75 0 00.5-1.342l-4.58-1.943zM10 18a.75.75 0 00.75-.75V15.5a.75.75 0 00-1.5 0v1.75A.75.75 0 0010 18z" /></svg>}
                    text="Share to Gallery"
                    onClick={() => onShareToGallery(bundle.imageUrl, bundle.affirmation)}
                />
                <ActionButton
                    icon={
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" /></svg>
                    }
                    text={t('saveWallpaper')}
                    href={bundle.imageUrl}
                    download
                />
                <ActionButton
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201-4.452 3.5 3.5 0 00-3.323 3.323 5.5 5.5 0 019.201 4.452 3.5 3.5 0 003.323-3.323z" clipRule="evenodd" /><path fillRule="evenodd" d="M1.173 8.354a5.5 5.5 0 018.328-3.415 3.5 3.5 0 00-3.323 3.323 5.5 5.5 0 01-8.328 3.415 3.5 3.5 0 003.323-3.323z" clipRule="evenodd" /></svg>
                    }
                    text={t('startOver')}
                    onClick={onReset}
                />
            </div>
            {videoError && <p role="alert" className="text-center text-red-500 dark:text-red-400 mt-4 animate-fade-in">{videoError}</p>}
            <p className="text-xs text-slate-500 dark:text-slate-600 mt-4 max-w-md mx-auto truncate animate-fade-in-up" style={{ animationDelay: '0.7s' }}>Prompt: "{bundle.imagePrompt}"</p>
        </div>
        {showBreathingGuide && isBreathingExercise && (
             <BreathingGuide 
                pattern={bundle.microAction.pattern} 
                title={bundle.microAction.title}
                onClose={() => setShowBreathingGuide(false)} />
        )}
        {isGeneratingVideo && <VideoLoadingModal />}
        {videoUrl && <VideoPlayerModal videoUrl={videoUrl} onClose={() => setVideoUrl(null)} />}
        </>
    );
};
