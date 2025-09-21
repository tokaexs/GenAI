import React, { useState, useCallback, useEffect } from 'react';
import { MoodSelector } from './components/MoodSelector';
import { TherapySession } from './components/TherapySession';
import { SafetyModal } from './components/SafetyModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Chatbot } from './components/Chatbot';
import { LoginModal } from './components/LoginModal';
import { SignupModal } from './components/SignupModal';
import { Pricing } from './components/Pricing';
import { Profile } from './components/Profile';
import { FeedbackModal } from './components/FeedbackModal';
import { UpgradeModal } from './components/UpgradeModal';
import { About } from './components/About';
import { Onboarding } from './components/Onboarding';
import { PaymentModal, Plan } from './components/PaymentModal';
import { Language, TherapyBundle, SessionHistoryItem, ActiveView, Theme, MoodInput, GalleryItem } from './types';
import { generateTherapy, checkForCrisis, generateImage } from './services/geminiService';
import { VISUAL_THEMES, SOUNDSCAPE_MAP, GALLERY_ITEMS } from './constants';
import { LandingPage } from './components/LandingPage';
import { useTranslations } from './utils/i18n';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CreatePage } from './components/CreatePage';
import { ResilienceQuest } from './components/ResilienceQuest';
import { FutureVisionBoard } from './components/FutureVisionBoard';
import { ZenDock } from './components/ZenDock';
import { ReframeModal } from './components/ReframeModal';
import { CommunityGallery } from './components/CommunityGallery';
import { PricingPage } from './components/PricingPage';


const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>(Language.EN);
    const [therapyBundle, setTherapyBundle] = useState<TherapyBundle | null>(null);
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeView, setActiveView] = useState<ActiveView>('moodscape');
    const [lastFocusedElement, setLastFocusedElement] = useState<HTMLElement | null>(null);
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(GALLERY_ITEMS);

    // Translations hook
    const { t } = useTranslations(language);

    // Modals state
    const [showSafetyModal, setShowSafetyModal] = useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showSignupModal, setShowSignupModal] = useState<boolean>(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
    const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
    const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
    const [showReframeModal, setShowReframeModal] = useState<boolean>(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    
    // Auth state
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userName, setUserName] = useState('User');
    const [sessionHistory, setSessionHistory] = useState<SessionHistoryItem[]>([]);
    
    // Theme state
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
            return localStorage.getItem('theme') as Theme;
        }
        return 'dark'; // Default theme
    });

    // Visual theme state
    const [visualTheme, setVisualTheme] = useState<string>(() => {
        return localStorage.getItem('visualTheme') || 'aurora';
    });

    // --- Modal Focus Management ---
    const openModal = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setLastFocusedElement(document.activeElement as HTMLElement);
        setter(true);
    };

    const closeModal = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(false);
        lastFocusedElement?.focus();
    };


    useEffect(() => {
        // Mock authentication check on component mount
        const userIsLoggedIn = localStorage.getItem('moodscape_auth') === 'true';
        setIsAuthenticated(userIsLoggedIn);

        if (userIsLoggedIn) {
            setActiveView('dashboard');
        } else {
            setActiveView('moodscape'); // This will trigger landing page
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            const storedName = localStorage.getItem('moodscape_userName') || 'User';
            setUserName(storedName);
            const storedHistory = localStorage.getItem('moodscape_sessionHistory');
            setSessionHistory(storedHistory ? JSON.parse(storedHistory) : []);
        }
    }, [isAuthenticated]);

    const handleOnboardingComplete = () => {
        closeModal(setShowOnboarding);
        localStorage.setItem('moodscape_onboarding_completed', 'true');
    };

    // Hide main content from screen readers when onboarding is active
    useEffect(() => {
        const mainContainer = document.getElementById('main-app-container');
        if (mainContainer) {
            if (showOnboarding) {
                mainContainer.setAttribute('aria-hidden', 'true');
            } else {
                mainContainer.removeAttribute('aria-hidden');
            }
        }
    }, [showOnboarding]);


    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'light') {
            root.classList.remove('dark');
        } else {
            root.classList.add('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    // Effect for visual theme
    useEffect(() => {
        const root = window.document.documentElement;
        // Remove old theme classes
        VISUAL_THEMES.forEach(t => root.classList.remove(`theme-${t.id}`));
        // Add current theme class
        root.classList.add(`theme-${visualTheme}`);
        localStorage.setItem('visualTheme', visualTheme);
    }, [visualTheme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleLoginSuccess = () => {
        localStorage.setItem('moodscape_auth', 'true');
        setIsAuthenticated(true);
        setActiveView('dashboard');
        closeModal(setShowLoginModal);
    };

    const handleSignupSuccess = () => {
        localStorage.setItem('moodscape_auth', 'true');
        setIsAuthenticated(true);
        setActiveView('dashboard');
        closeModal(setShowSignupModal);
        // Show onboarding tour right after the user signs up.
        setTimeout(() => openModal(setShowOnboarding), 500);
    };

    const handleLogout = () => {
        localStorage.removeItem('moodscape_auth');
        setIsAuthenticated(false);
        setTherapyBundle(null); // Clear any active session
        setActiveView('moodscape'); // Reset to default view on logout
    };
    
    const handleShareToGallery = (imageUrl: string, affirmation: string) => {
        const newItem: GalleryItem = {
            id: new Date().toISOString(),
            imageUrl,
            affirmation,
        };
        setGalleryItems(prev => [newItem, ...prev]);
        // In a real app, you'd show a confirmation toast
        alert("Your MoodScape has been shared to the Community Gallery!");
        setActiveView('community_gallery'); // Navigate to gallery after sharing
    };


    const handleGenerateTherapy = useCallback(async (moodInput: MoodInput) => {
        setLoadingMessage("Preparing your session...");
        setError(null);
        setTherapyBundle(null);

        try {
            const fullInput = `${moodInput.mood}. ${moodInput.context}. Intensity: ${moodInput.intensity}. Color: ${moodInput.color}.`;
            const isCrisis = await checkForCrisis(fullInput);

            if (isCrisis) {
                openModal(setShowSafetyModal);
                setLoadingMessage(null);
                return;
            }

            setLoadingMessage("Crafting your personalized narration...");
            const bundle = await generateTherapy(moodInput, language);
            
            setLoadingMessage("Generating a calming visual...");
            const imageUrl = await generateImage(bundle.imagePrompt);

            // @ts-ignore
            const soundscapeUrl = SOUNDSCAPE_MAP[bundle.soundscapeType] || SOUNDSCAPE_MAP.default;

            setTherapyBundle({
                ...bundle,
                imageUrl: imageUrl,
                soundscapeUrl: soundscapeUrl,
            });

            // Save session to history in localStorage
            const newHistoryItem: SessionHistoryItem = {
                date: new Date().toISOString(),
                mood: moodInput.mood,
                context: moodInput.context,
                affirmation: bundle.affirmation,
                imageUrl: imageUrl, // Save image URL for potential future use
            };
            const historyString = localStorage.getItem('moodscape_sessionHistory');
            const history: SessionHistoryItem[] = historyString ? JSON.parse(historyString) : [];
            history.unshift(newHistoryItem);
            const limitedHistory = history.slice(0, 50); // Keep the 50 most recent sessions for level calculation
            localStorage.setItem('moodscape_sessionHistory', JSON.stringify(limitedHistory));
            setSessionHistory(limitedHistory); // Update state

            openModal(setShowUpgradeModal);

        } catch (err) {
            console.error("Error generating therapy session:", err);
            setError("Sorry, we couldn't create your session right now. Please try again later.");
        } finally {
            setLoadingMessage(null);
        }
    }, [language]);

    const handleReset = () => {
        setTherapyBundle(null);
        setError(null);
        setActiveView('create'); // Go back to the creation hub
    };

    const handleUpgradeClick = (plan: Plan) => {
        setSelectedPlan(plan);
        // Close other modals before opening payment
        setShowUpgradeModal(false);
        openModal(setShowPaymentModal);
    };

    const handlePaymentSuccess = () => {
        console.log(`Successfully upgraded to ${selectedPlan?.name}`);
        // Here you would typically update user subscription status in your backend.
        // For this mock app, we'll just close the modal.
        closeModal(setShowPaymentModal);
        setSelectedPlan(null);
    };

    const handleExploreFromAbout = () => {
        handleReset();
        if (isAuthenticated) {
            setActiveView('create');
        } else {
            openModal(setShowSignupModal);
        }
    }

    const handleViewPricingFromAbout = () => {
        handleReset();
        setActiveView('pricing');
    }

     const renderMainContent = () => {
        // High priority views: loading and active session
        if (loadingMessage) return <LoadingSpinner message={loadingMessage} />;
        if (therapyBundle) return <TherapySession bundle={therapyBundle} onReset={handleReset} language={language} onShareToGallery={handleShareToGallery} />;
        if (error) return <p role="alert" className="text-red-500 dark:text-red-400 my-auto text-center">{error}</p>;

        switch (activeView) {
            case 'pricing':
                return <Pricing onUpgrade={handleUpgradeClick} />;
            case 'profile':
                return <Profile 
                    onManageSubscription={() => setActiveView('pricing')} 
                    sessionHistory={sessionHistory}
                    onLogout={handleLogout}
                    onReturnToDashboard={() => {
                        handleReset();
                        setActiveView('dashboard');
                    }}
                />;
            case 'chat':
                return <Chatbot />;
            case 'about':
                return <About onExplore={handleExploreFromAbout} onViewPricing={handleViewPricingFromAbout} />;
            case 'create':
                 return <CreatePage onNavigate={setActiveView} />;
            case 'community_gallery':
                return <CommunityGallery items={galleryItems} />;
            case 'moodscape_creation':
                 return <MoodSelector onGenerate={handleGenerateTherapy} isLoading={!!loadingMessage} language={language} />;
            case 'resilience_quest':
                return <ResilienceQuest />;
            case 'vision_board':
                return <FutureVisionBoard />;
            case 'dashboard':
            default:
                 return <Dashboard 
                    userName={userName}
                    sessionHistory={sessionHistory}
                    onNavigate={(view) => {
                        handleReset();
                        setActiveView(view);
                    }}
                />;
        }
    };

    // Conditional classes for the main content area
    const mainContainerClasses = [
        'w-full', 'flex-grow', 'flex', 'flex-col', 'min-h-0', // min-h-0 is crucial for flex children scrolling
        'p-4 sm:p-8 md:p-12', 'glassmorphism', 'rounded-2xl', 'shadow-2xl', 'relative', 'overflow-y-auto',
        (activeView === 'moodscape_creation')
            ? 'justify-center items-center text-center' // Center mood selector
            : 'justify-start' // Align everything else to the top
    ].join(' ');

    const isPublicView = activeView === 'moodscape' || activeView === 'public_pricing';

    return (
        <div className={`min-h-screen w-full overflow-x-hidden selection:bg-cyan-400/80 selection:text-slate-900 ${isPublicView ? '' : 'p-4'}`}>
             {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

             {activeView === 'moodscape' && (
                 <LandingPage
                    language={language}
                    onSignupClick={() => openModal(setShowSignupModal)}
                    onLoginClick={() => openModal(setShowLoginModal)}
                    onViewPricing={() => setActiveView('public_pricing')}
                    onLanguageChange={setLanguage}
                    theme={theme}
                    onThemeToggle={toggleTheme}
                />
             )}
            
             {activeView === 'public_pricing' && (
                 <PricingPage
                    language={language}
                    onGetStarted={() => openModal(setShowSignupModal)}
                    onLoginClick={() => openModal(setShowLoginModal)}
                    onBackToHome={() => setActiveView('moodscape')}
                    onLanguageChange={setLanguage}
                    theme={theme}
                    onThemeToggle={toggleTheme}
                 />
             )}

             {!isPublicView && isAuthenticated && (
                <div className="w-full max-w-7xl mx-auto flex gap-6 h-[calc(100vh-2rem)]">
                    <Sidebar
                        activeView={activeView}
                        sessionHistory={sessionHistory}
                        onNavigate={(view) => {
                            handleReset();
                            setActiveView(view);
                        }}
                        onLogout={handleLogout}
                        theme={theme}
                        onToggleTheme={toggleTheme}
                        language={language}
                        onSetLanguage={setLanguage}
                    />
                    <div id="main-app-container" className="flex-grow flex flex-col min-w-0">
                        <main className={mainContainerClasses}>
                            {renderMainContent()}
                        </main>
                         <ZenDock 
                            onOpenReframe={() => openModal(setShowReframeModal)}
                            onOpenAbout={() => {
                                handleReset();
                                setActiveView('about');
                            }}
                            onOpenFeedback={() => openModal(setShowFeedbackModal)}
                        />
                    </div>
                </div>
             )}

            <SafetyModal isOpen={showSafetyModal} onClose={() => closeModal(setShowSafetyModal)} />
            <LoginModal 
                isOpen={showLoginModal} 
                onClose={() => closeModal(setShowLoginModal)} 
                onLoginSuccess={handleLoginSuccess}
                onSwitchToSignup={() => { closeModal(setShowLoginModal); openModal(setShowSignupModal); }}
            />
            <SignupModal 
                isOpen={showSignupModal}
                onClose={() => closeModal(setShowSignupModal)}
                onSignupSuccess={handleSignupSuccess}
                onSwitchToLogin={() => { closeModal(setShowSignupModal); openModal(setShowLoginModal); }}
            />
            <FeedbackModal
                isOpen={showFeedbackModal}
                onClose={() => closeModal(setShowFeedbackModal)}
            />
            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => closeModal(setShowUpgradeModal)}
                onUpgrade={handleUpgradeClick}
            />
             <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => closeModal(setShowPaymentModal)}
                onPaymentSuccess={handlePaymentSuccess}
                plan={selectedPlan}
            />
             <ReframeModal 
                isOpen={showReframeModal}
                onClose={() => closeModal(setShowReframeModal)}
             />
        </div>
    );
};

export default App;