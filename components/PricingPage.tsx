import React from 'react';
import { Language } from '../types';
import { useTranslations } from '../utils/i18n';
import { ThemeToggle } from './ThemeToggle';
import { LANGUAGES } from '../constants';

// Re-using these components from Pricing.tsx
const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-cyan-500 dark:text-cyan-400" aria-hidden="true">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
    </svg>
);

const PricingCard: React.FC<{
    plan: string;
    price: string;
    description: string;
    features: string[];
    isFeatured?: boolean;
    onGetStarted: () => void;
}> = ({ plan, price, description, features, isFeatured = false, onGetStarted }) => {
    
    const buttonContent = `Get Started with ${plan}`;
    let buttonClasses = "w-full font-bold py-3 px-4 rounded-full text-lg transition-all duration-300 ease-in-out shadow-lg";

    if (isFeatured) {
        buttonClasses += " bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-white hover:shadow-cyan-500/50 dark:hover:shadow-cyan-400/30";
    } else {
        buttonClasses += " bg-slate-600 hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-600 text-white";
    }
    
    const isFreePlan = price === "$0";

    return (
        <div className={`relative w-full max-w-sm p-8 rounded-2xl transform transition-all duration-500 ease-in-out ${isFeatured ? 'glassmorphism border-cyan-500/50 dark:border-cyan-400/50 scale-105 shadow-2xl' : 'glassmorphism hover:scale-105 hover:shadow-xl'}`}>
            {isFeatured && <div className="absolute top-0 right-8 -mt-4 bg-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>}
             {isFeatured && <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-2xl blur-lg opacity-60 animate-pulse" style={{ animationDuration: '4s' }}></div>}
            <div className="relative">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{plan}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{description}</p>
                <p className="mb-6">
                    <span className="text-5xl font-extrabold text-slate-900 dark:text-white">{price}</span>
                    { !isFreePlan && <span className="text-lg font-medium text-slate-500 dark:text-slate-400">/month</span> }
                </p>
                <ul className="space-y-4 text-left mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <CheckIcon />
                            <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={onGetStarted}
                    className={buttonClasses}
                >
                    {buttonContent}
                </button>
            </div>
        </div>
    );
};

interface PricingPageProps {
  onGetStarted: () => void;
  onLoginClick: () => void;
  onBackToHome: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
    onGetStarted,
    onLoginClick,
    onBackToHome,
    language,
    onLanguageChange,
    theme,
    onThemeToggle
}) => {
    const { t } = useTranslations(language);

    return (
        <div className="w-full min-h-screen animate-fade-in text-center">
            <header className="absolute top-0 left-0 right-0 z-30 p-4">
                <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <button onClick={onBackToHome} className="flex items-center gap-3" aria-label="Return to Home page">
                            <div className="w-8 h-8 text-cyan-500 dark:text-cyan-400" style={{ filter: 'drop-shadow(0 0 8px currentColor)'}}>
                                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c-1.39 0-2.73.29-3.95.84l.89.89a6.5 6.5 0 018.12 0l.89-.89A7.96 7.96 0 0012 4zm0 14a6 6 0 01-4.24-1.76l-.89.89A8 8 0 0012 20a8 8 0 007.13-4.87l-.89-.89A6 6 0 0112 18z"></path><path d="M12 6a6 6 0 00-6 6 6 6 0 006 6 6 6 0 006-6 6 6 0 00-6-6zm0 2a4 4 0 110 8 4 4 0 010-8z"></path><circle cx="12" cy="12" r="2" fill="currentColor"></circle></svg>
                            </div>
                            <span className="text-xl font-bold text-slate-800 dark:text-slate-100">MoodScape</span>
                        </button>
                         <nav className="hidden md:flex border-l border-slate-300 dark:border-slate-700/50 pl-6">
                             <button 
                                onClick={onBackToHome}
                                className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors hover:text-cyan-500 dark:hover:text-cyan-300"
                            >
                                {t('navHome')}
                            </button>
                        </nav>
                    </div>

                     <div className="flex items-center gap-2">
                        <div className="hidden md:flex items-center gap-2">
                            <button onClick={onLoginClick} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors">{t('logIn')}</button>
                            <button onClick={onGetStarted} className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors shadow-sm hover:shadow-md">{t('signUp')}</button>
                        </div>
                        <select
                            value={language}
                            onChange={(e) => onLanguageChange(e.target.value as Language)}
                            className="bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/80 rounded-lg py-2 px-3 text-sm text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                            aria-label="Select language"
                        >
                            {LANGUAGES.map(lang => (
                                <option key={lang.value} value={lang.value} className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                                    {lang.label}
                                </option>
                            ))}
                        </select>
                        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
                    </div>
                </div>
            </header>
            <main className="pt-32 pb-16">
                 <div className="w-full max-w-5xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-fuchsia-500 dark:from-cyan-400 dark:to-fuchsia-400 mb-3">
                            Find Your Plan
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
                            Choose the plan that best fits your journey to mindfulness and well-being.
                        </p>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8">
                        <PricingCard
                            plan="Explorer"
                            price="$0"
                            description="Get started with essential features for free."
                            features={['5 MoodScapes per month', 'Standard AI chat', 'Community access']}
                            onGetStarted={onGetStarted}
                        />
                        <PricingCard
                            plan="Companion"
                            price="$9"
                            description="Deeper personalization and more content."
                            features={['Unlimited MoodScapes', 'Advanced AI chat', 'Video scene generation', 'Save your favorites']}
                            isFeatured
                            onGetStarted={onGetStarted}
                        />
                        <PricingCard
                            plan="Sanctuary"
                            price="$19"
                            description="The ultimate wellness toolkit for you."
                            features={['All Companion features', 'Voice journaling (Coming soon)', 'Personalized progress tracking', 'Priority support']}
                            onGetStarted={onGetStarted}
                        />
                    </div>
                 </div>
            </main>
        </div>
    );
};