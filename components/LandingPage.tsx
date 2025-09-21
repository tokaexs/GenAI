
import React from 'react';
import { Language } from '../types';
import { useTranslations } from '../utils/i18n';
import { ThemeToggle } from './ThemeToggle';
import { LANGUAGES } from '../constants';

interface LandingPageProps {
  onSignupClick: () => void;
  onLoginClick: () => void;
  onViewPricing: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

const Section: React.FC<{
    children: React.ReactNode;
    className?: string;
    ariaLabelledby?: string;
}> = ({ children, className = '', ariaLabelledby }) => (
    <section className={`w-full py-16 md:py-24 ${className}`} aria-labelledby={ariaLabelledby}>
        <div className="w-full max-w-5xl mx-auto px-4">{children}</div>
    </section>
);

const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}> = ({ icon, title, children }) => (
    <div className="glassmorphism p-6 rounded-2xl flex flex-col items-start text-left h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.03]">
        <div className="w-12 h-12 flex items-center justify-center bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-500 dark:text-cyan-400 rounded-lg mb-4" aria-hidden="true">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{children}</p>
    </div>
);

const FutureFeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}> = ({ icon, title, children }) => (
    <div className="glassmorphism p-6 rounded-2xl flex flex-col items-start text-left h-full transition-all duration-300 border border-slate-300/10 dark:border-slate-700/20 hover:border-fuchsia-500/50 dark:hover:border-fuchsia-400/50 hover:shadow-2xl hover:scale-[1.03]">
        <div className="w-12 h-12 flex items-center justify-center bg-fuchsia-500/10 dark:bg-fuchsia-400/10 text-fuchsia-500 dark:text-fuchsia-400 rounded-lg mb-4" aria-hidden="true">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{children}</p>
    </div>
);

const VisionFeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}> = ({ icon, title, children }) => (
    <div className="glassmorphism p-6 rounded-2xl flex flex-col items-start text-left h-full transition-all duration-300 border border-slate-300/10 dark:border-slate-700/20 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 hover:shadow-2xl hover:scale-[1.03]">
        <div className="w-12 h-12 flex items-center justify-center bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-500 dark:text-indigo-400 rounded-lg mb-4" aria-hidden="true">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{children}</p>
    </div>
);

const TestimonialCard: React.FC<{
    quote: string;
    author: string;
    role: string;
}> = ({ quote, author, role }) => (
     <div className="glassmorphism p-6 rounded-2xl text-left h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.03]">
        <blockquote className="flex-grow">
            <p className="text-slate-700 dark:text-slate-300 italic">"{quote}"</p>
        </blockquote>
        <footer className="mt-4 pt-4 border-t border-slate-300/50 dark:border-slate-700/50">
            <p className="font-bold text-slate-800 dark:text-slate-200">{author}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{role}</p>
        </footer>
    </div>
);


export const LandingPage: React.FC<LandingPageProps> = ({ 
    onSignupClick, 
    onLoginClick,
    onViewPricing, 
    language,
    onLanguageChange,
    theme,
    onThemeToggle
}) => {
    const { t } = useTranslations(language);
    return (
        <div className="w-full animate-fade-in text-center">
             <header className="absolute top-0 left-0 right-0 z-30 p-4">
                <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 text-cyan-400" style={{ filter: 'drop-shadow(0 0 8px currentColor)'}}>
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c-1.39 0-2.73.29-3.95.84l.89.89a6.5 6.5 0 018.12 0l.89-.89A7.96 7.96 0 0012 4zm0 14a6 6 0 01-4.24-1.76l-.89.89A8 8 0 0012 20a8 8 0 007.13-4.87l-.89-.89A6 6 0 0112 18z"></path><path d="M12 6a6 6 0 00-6 6 6 6 0 006 6 6 6 0 006-6 6 6 0 00-6-6zm0 2a4 4 0 110 8 4 4 0 010-8z"></path><circle cx="12" cy="12" r="2" fill="currentColor"></circle></svg>
                        </div>
                        <span className="text-xl font-bold text-slate-100" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>MoodScape</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-1">
                         <button 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="px-4 py-2 text-sm font-semibold text-white transition-colors hover:text-cyan-300"
                            aria-current="page"
                        >
                            {t('navHome')}
                        </button>
                        <button 
                            onClick={onViewPricing}
                            className="px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:text-cyan-300"
                        >
                            {t('navPricing')}
                        </button>
                    </nav>

                     <div className="flex items-center gap-2">
                        <div className="hidden md:flex items-center gap-2">
                            <button onClick={onLoginClick} className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-cyan-300 transition-colors">{t('logIn')}</button>
                            <button onClick={onSignupClick} className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors shadow-sm hover:shadow-md">{t('signUp')}</button>
                        </div>
                        <select
                            value={language}
                            onChange={(e) => onLanguageChange(e.target.value as Language)}
                            className="bg-slate-900/50 border border-slate-700/80 rounded-lg py-2 px-3 text-sm text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                            aria-label="Select language"
                        >
                            {LANGUAGES.map(lang => (
                                <option key={lang.value} value={lang.value} className="bg-slate-800 text-slate-200">
                                    {lang.label}
                                </option>
                            ))}
                        </select>
                        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
                    </div>
                </div>
            </header>
            
            {/* Hero Section */}
            <section className="relative text-center overflow-hidden min-h-screen flex items-center justify-center">
                 <div className="absolute inset-0 w-full h-full">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                        src="https://videos.pexels.com/video-files/857039/857039-hd_1920_1080_25fps.mp4"
                        aria-hidden="true"
                    >
                        <source src="https://videos.pexels.com/video-files/857039/857039-hd_1920_1080_25fps.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-slate-900/50 dark:bg-slate-900/70 z-10" />
                </div>
                <div className="relative z-20 w-full max-w-5xl mx-auto px-4 py-24 md:py-32">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 animate-fade-in-up" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        {t('heroTitle')}
                    </h1>
                    <p className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s', textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>
                        {t('heroSubtitle')}
                    </p>
                    <button
                        onClick={onSignupClick}
                        className="main-cta-button !max-w-xs animate-fade-in-up"
                        style={{ animationDelay: '0.4s' }}
                    >
                        {t('getStartedForFree')}
                    </button>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer" onClick={() => document.querySelector('#how-it-works-title')?.scrollIntoView({ behavior: 'smooth' })}>
                    <span className="sr-only">Scroll down</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white/70">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </section>

            {/* How It Works Section */}
            <Section ariaLabelledby="how-it-works-title">
                <h2 id="how-it-works-title" className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="text-5xl mb-4 font-bold text-fuchsia-500 dark:text-fuchsia-400">1.</div>
                        <h3 className="text-xl font-semibold mb-2">Share Your Mood</h3>
                        <p className="text-slate-600 dark:text-slate-400">Select how you're feeling or describe it in your own words.</p>
                    </div>
                    <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="text-5xl mb-4 font-bold text-cyan-500 dark:text-cyan-400">2.</div>
                        <h3 className="text-xl font-semibold mb-2">AI Creates Your Scape</h3>
                        <p className="text-slate-600 dark:text-slate-400">Our AI generates a unique session with visuals, narration, and an exercise.</p>
                    </div>
                    <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <div className="text-5xl mb-4 font-bold text-emerald-500 dark:text-emerald-400">3.</div>
                        <h3 className="text-xl font-semibold mb-2">Find Your Calm</h3>
                        <p className="text-slate-600 dark:text-slate-400">Immerse yourself in your personalized sanctuary and find your balance.</p>
                    </div>
                </div>
            </Section>
            
            {/* Features Section */}
            <Section className="bg-slate-500/5 dark:bg-slate-900/20" ariaLabelledby="features-title">
                 <h2 id="features-title" className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-12">Your Personal Wellness Toolkit</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     <FeatureCard icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path d="M10 3.75a2 2 0 100 4 2 2 0 000-4zM10 8.75a2 2 0 100 4 2 2 0 000-4zM10 13.75a2 2 0 100 4 2 2 0 000-4z" /></svg>} title="Personalized AI Sessions">
                        Every session is unique, crafted in real-time based on your specific mood and needs for a truly personal experience.
                     </FeatureCard>
                     <FeatureCard icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.507 6.054a.75.75 0 01.635 1.22l-1.3 2.25a.75.75 0 01-1.27- .734l1.3-2.25a.75.75 0 01.635-.486zM14.493 6.054a.75.75 0 011.27.734l-1.3 2.25a.75.75 0 01-1.27-.734l1.3-2.25a.75.75 0 010- .52zM10 10a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0zm-6 3a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2z" /></svg>} title="Guided Breathing">
                        Follow interactive, customizable breathing exercises designed to calm your nervous system and improve focus.
                     </FeatureCard>
                     <FeatureCard icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path d="M.782 5.253a.75.75 0 01.993-.455L3 5.425v2.828l-2.218.634a.75.75 0 01-.993-.455V5.253zM3 9.75v3.425l-2.218.633a.75.75 0 01-.993-.455V9.75l3- .857zM4.5 5.425l1.432-.41a.75.75 0 01.916.916l-1.432.41V5.425zM4.5 9.75v5.828l1.432-.41a.75.75 0 01.916.916l-1.432.41V9.75zM8.25 4.5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zM8.25 9a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5z" /></svg>} title="Narrated Scenes">
                        Listen to soothing, imaginative stories that transport you to a place of peace, paired with powerful affirmations.
                     </FeatureCard>
                     <FeatureCard icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H8.06l-2.47 2.47a.75.75 0 01-1.06-1.06L6.94 13H1.75a.75.75 0 01-.75-.75V2.75zm1.5 0v7.5h11V2.75H2.5z" clipRule="evenodd" /></svg>} title="Mindful Chat">
                        Talk with Mitra, a supportive AI companion, in a safe, non-judgmental space to explore your thoughts.
                     </FeatureCard>
                     <FeatureCard icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 0A.75.75 0 013.25 4.5h13.5A.75.75 0 0117.5 5.25v9.5a.75.75 0 01-.75.75H3.25a.75.75 0 01-.75-.75v-9.5z" clipRule="evenodd" /></svg>} title="Calming Visuals & Video">
                        Each session includes a unique, AI-generated wallpaper. Pro users can even bring their scenes to life with video.
                     </FeatureCard>
                      <FeatureCard icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" /></svg>} title="Track Your Journey">
                        Review your session history to see your progress and revisit affirmations that resonated with you.
                     </FeatureCard>
                 </div>
            </Section>

            {/* The Future Section */}
            <Section ariaLabelledby="future-title">
                 <h2 id="future-title" className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">The Future of Wellness is Generative</h2>
                 <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto mb-12">
                    We're just getting started. MoodScape is evolving with cutting-edge generative AI to build a deeper, more interactive, and truly adaptive wellness experience. Here's a glimpse of what's coming next.
                </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     <FutureFeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path d="M10 3.5a.75.75 0 01.75.75V7.25l1.64-1.64a.75.75 0 011.06 1.06L12.42 8l1.03 1.03a.75.75 0 01-1.06 1.06L11.36 9.06l-1.03 1.03a.75.75 0 11-1.06-1.06l1.03-1.03-1.03-1.03a.75.75 0 01-1.06-1.06l1.64-1.64V4.25A.75.75 0 0110 3.5z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" /></svg>}
                        title="Biofeedback & Adaptive AI">
                        Imagine an app that responds to your body's signals, dynamically adapting visuals, music, and pacing to your real-time stress levels for a truly personalized session.
                     </FutureFeatureCard>
                      <FutureFeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path d="M14.044 14.044a.75.75 0 011.06 0l1.25-1.25a.75.75 0 111.06 1.06l-1.25 1.25a.75.75 0 010 1.06l1.25 1.25a.75.75 0 11-1.06 1.06l-1.25-1.25a.75.75 0 01-1.06 0zM10 18a.75.75 0 01.75-.75h.01a.75.75 0 010 1.5H10.75a.75.75 0 01-.75-.75zM5.956 14.044a.75.75 0 10-1.06 0l-1.25 1.25a.75.75 0 00-1.06 1.06l1.25 1.25a.75.75 0 101.06 1.06l1.25-1.25a.75.75 0 000-1.06l-1.25-1.25a.75.75 0 00-1.06 0zM3 10a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0V10.75A.75.75 0 013 10zm13.25.75a.75.75 0 000-1.5h-.01a.75.75 0 000 1.5h.01zM10 2.25a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0V2.25z" /><path fillRule="evenodd" d="M11.24 4.72a.75.75 0 01.196 1.044l-1.858 3.715a.75.75 0 11-1.33-.664l1.858-3.715a.75.75 0 011.134-.376z" clipRule="evenodd" /></svg>}
                        title="Multimodal Expression">
                        Go beyond words. Animate your emotions into dance, co-create AI-powered story theatres, and turn your dreams into interactive mini-simulations to express your inner world.
                     </FutureFeatureCard>
                      <FutureFeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path d="M15.5 2.5a3 3 0 00-3-3H7.5a3 3 0 00-3 3v15a3 3 0 003 3h5a3 3 0 003-3V2.5zM12.5 6a.5.5 0 01-.5-.5v-2a.5.5 0 011 0v2a.5.5 0 01-.5.5z" /><path d="M10 14a1 1 0 100-2 1 1 0 000 2zM7.5 7.5a.5.5 0 000 1h5a.5.5 0 000-1h-5z" /></svg>}
                        title="Gamified Growth Worlds">
                        Wellness should be engaging. Embark on daily quests in an AI Mental Fitness Gym, unlock new generative safe spaces as you grow, and join community missions.
                     </FutureFeatureCard>
                      <FutureFeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" /></svg>}
                        title="Personal Digital Companion">
                        Visualize your wellness journey. Develop an AI Mood Twin that evolves with you, see your emotional energy with a Generative Self-Mirror, and explore future selves.
                     </FutureFeatureCard>
                      <FutureFeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" /></svg>}
                        title="Global Collective Wellness">
                        Connect through a real-time World Mood Map, participate in AI-generated Festivals of Emotions, and experience wellness traditions from around the world.
                     </FutureFeatureCard>
                      <FutureFeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9a.5.5 0 00-1 0v6a.5.5 0 001 0V9A4.5 4.5 0 0010 1zM9 5.5a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5zM10.25 18.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /><path d="M10 3a5.505 5.505 0 00-5.5 5.5V9a1.5 1.5 0 103 0V8.5A2.5 2.5 0 1110 6z" /></svg>}
                        title="Research & Responsible AI">
                        Your safety is paramount. We're developing a personalized wellness index, enhancing safety filters, and contributing anonymized data to global mental health research.
                     </FutureFeatureCard>
                 </div>
            </Section>

            {/* Beyond Next-Level Section */}
            <Section className="bg-slate-500/5 dark:bg-slate-900/20" ariaLabelledby="vision-title">
                 <h2 id="vision-title" className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">Beyond Next-Level: Our Vision</h2>
                 <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto mb-12">
                    Pushing the boundaries of what's possible. These are the moonshot ideas that drive our innovation and our commitment to pioneering the future of generative wellness.
                </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     <VisionFeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path d="M7 4a3 3 0 016 0v1.25a.75.75 0 01-1.5 0V5a1.5 1.5 0 00-3 0v.25a.75.75 0 01-1.5 0V4z" /><path fillRule="evenodd" d="M3.238 9.34a.75.75 0 01.624-.322h12.276a.75.75 0 01.624.322l1.124 3.372a.75.75 0 01-.22 1.002l-5.022 3.766a.75.75 0 01-.868 0l-5.022-3.766a.75.75 0 01-.22-1.002l1.124-3.372zM5.811 12.443l4.189 3.142 4.189-3.142-.749-2.248H6.56l-.749 2.248z" clipRule="evenodd" /></svg>}
                        title="Neuro-AI Wellness">
                        Connect directly with your mind. We're exploring brainwave integration (EEG) for adaptive experiences and using AI to interpret and visualize dreams.
                     </VisionFeatureCard>
                      <VisionFeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M3.328 2.75a.75.75 0 01.75-.75h11.844a.75.75 0 01.75.75v.016l.002.002.002.002.006.006.002.002.005.004.013.01.003.002.005.003.01.007.008.005.018.01.01.006.02.012.016.009.02.01.024.013.016.008.02.01.036.018.01.005.01.005.024.012.016.008.02.009.023.01.03.013.024.01.023.01.045.018.01.004.01.004.02.008.016.006.03.01.025.008.03.01.042.012.01.003.015.004.03.008.02.005.03.007.032.007.01.002.01.002.042.008.02.004.02.004.03.005.03.005.02.003.02.003.04.005.02.002.02.002.04.004.03.002.03.002.02.001.04.002.02.001.03.001.02.001.03.001.01a.75.75 0 010 .02v9.468a.75.75 0 01-.75.75H4.078a.75.75 0 01-.75-.75V3.328a.75.75 0 010-.02L3.328 3.3v-.55z" clipRule="evenodd" /><path d="M4.53 3.328a.75.75 0 00-.75.75v11.844a.75.75 0 00.75.75h9.468a.75.75 0 00.02 0l.001.002.002.002.006.006.002.002.005.004.013.01.003.002.005.003.01.007.008.005.018.01.01.006.02.012.016.009.02.01.024.013.016.008.02.01.036.018.01.005.01.005.024.012.016.008.02.009.023.01.03.013.024.01.023.01.045.018.01.004.01.004.02.008.016.006.03.01.025.008.03.01.042.012.01.003.015.004.03.008.02.005.03.007.032.007.01.002.01.002.042.008.02.004.02.004.03.005.03.005.02.003.02.003.04.005.02.002.02.002.04.004.03.002.03.002.02.001.04.002.02.001.03.001.02.001.03.001.01l.55.001a.75.75 0 00.75-.75V4.078a.75.75 0 00-.75-.75H4.53z" /></svg>}
                        title="Generative Multiverse">
                        Go beyond static art. Generate entire explorable mini-worlds that reflect your moods and simulate parallel selves to explore different life paths.
                     </VisionFeatureCard>
                      <VisionFeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.507 6.054a.75.75 0 01.635 1.22l-1.3 2.25a.75.75 0 01-1.27-.734l1.3-2.25a.75.75 0 01.635-.486zM14.493 6.054a.75.75 0 011.27.734l-1.3 2.25a.75.75 0 01-1.27-.734l1.3-2.25a.75.75 0 010-.52zM10 10a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0zm-6 3a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2z" /></svg>}
                        title="Creative Expression Amplified">
                        Transform your emotions into personalized fashion designs, rap lyrics, or even hear how your feelings would sound with AI-generated audio transformations.
                     </VisionFeatureCard>
                      <VisionFeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v.518a12 12 0 018.086 8.086h.518a.75.75 0 010 1.5h-.518a12 12 0 01-8.086 8.086v.518a.75.75 0 01-1.5 0v-.518A12 12 0 012.25 12.154h-.518a.75.75 0 010-1.5h.518A12 12 0 019.25 2.568V2.75a.75.75 0 01.75-.75zm0 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>}
                        title="Subconscious Unlockers">
                        Safely explore your inner world. Use an AI Symbol Interpreter for abstract emotions and discover hidden strengths through 'Shadow Self' explorations.
                     </VisionFeatureCard>
                      <VisionFeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.75 7.066c.168.02.338.034.51.034h9.48a.75.75 0 010 1.5H5.26c-.172 0-.342-.014-.51-.034a.75.75 0 01.12-1.492zM4.251 12.12a.75.75 0 01.597.518 7.003 7.003 0 0010.304 0 .75.75 0 111.194.596 8.503 8.503 0 01-12.692 0 .75.75 0 01.597-.518z" clipRule="evenodd" /></svg>}
                        title="Collective Intelligence">
                        Contribute to a global wellness movement. Experience a 'Global Mood Orchestra,' influence policy via a Youth UN Platform, and co-create collective vision boards.
                     </VisionFeatureCard>
                      <VisionFeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path d="M11.954 1.222a.75.75 0 01.815.117l5.488 4.573a.75.75 0 01-.32 1.353l-2.438.318-2.61 5.992a.75.75 0 01-1.385-.555l2.25-5.174-2.438.318a.75.75 0 01-.319-1.353l3.87-3.224-2.83-3.774a.75.75 0 01.927-.974z" /><path d="M4.646 4.646a.75.75 0 011.06 0l6 6a.75.75 0 01-1.06 1.06l-6-6a.75.75 0 010-1.06z" /></svg>}
                        title="Tech Show-Off Features">
                        Pioneering frictionless wellness with Zero UI modes (gestures, voice), generative AR tattoos for symbolic expression, and even holographic emotional projections.
                     </VisionFeatureCard>
                 </div>
            </Section>

            {/* Testimonials Section */}
            <Section ariaLabelledby="testimonials-title">
                <h2 id="testimonials-title" className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-12">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TestimonialCard author="Priya S." role="Student" quote="MoodScape is my go-to before a big exam. The breathing exercises are a lifesaver for my anxiety." />
                    <TestimonialCard author="Rohan K." role="Young Professional" quote="I was skeptical about an AI app for wellness, but it genuinely helps. The narrated scenes are incredibly creative and calming." />
                    <TestimonialCard author="Aisha M." role="Artist" quote="As a creative person, I love that every session is unique. It's like a little piece of art for my mind. Highly recommend." />
                </div>
            </Section>

            {/* Final CTA Section */}
            <Section className="bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5 dark:from-cyan-400/10 dark:to-fuchsia-400/10 rounded-2xl" ariaLabelledby="cta-title">
                 <h2 id="cta-title" className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">Ready to Build Your Sanctuary?</h2>
                 <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-8">
                    Your journey to a calmer, more focused you starts now. Sign up for free and create your first MoodScape in minutes.
                </p>
                 <button
                    onClick={onSignupClick}
                    className="main-cta-button !max-w-xs"
                >
                    Create Your Free Account
                </button>
            </Section>

        </div>
    );
};
