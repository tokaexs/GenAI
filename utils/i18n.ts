import { Language } from '../types';

type Translations = {
    [key: string]: {
        [lang in Language]?: string;
    };
};

export const translations: Translations = {
    // App.tsx / Nav
    navMoodScape: {
        [Language.EN]: 'MoodScape',
        [Language.HI]: 'मूडस्केप',
        [Language.HINGLISH]: 'MoodScape',
    },
    navMindfulChat: {
        [Language.EN]: 'Mindful Chat',
        [Language.HI]: 'माइंडफुल चैट',
        [Language.HINGLISH]: 'Mindful Chat',
    },
    navPricing: {
        [Language.EN]: 'Pricing',
        [Language.HI]: 'कीमत',
        [Language.HINGLISH]: 'Pricing',
    },
    navHome: {
        [Language.EN]: 'Home',
        [Language.HI]: 'होम',
        [Language.HINGLISH]: 'Home',
    },
    logIn: {
        [Language.EN]: 'Log In',
        [Language.HI]: 'लॉग इन करें',
        [Language.HINGLISH]: 'Log In',
    },
    signUp: {
        [Language.EN]: 'Sign Up',
        [Language.HI]: 'साइन अप करें',
        [Language.HINGLISH]: 'Sign Up',
    },
    // MoodSelector.tsx
    howAreYouFeeling: {
        [Language.EN]: '1. How are you feeling?',
        [Language.HI]: '१. आप कैसा महसूस कर रहे हैं?',
        [Language.HINGLISH]: '1. Aap kaisa feel kar rahe hain?',
    },
    tellMeMore: {
        [Language.EN]: '2. Tell me more (optional)',
        [Language.HI]: '२. मुझे और बताएं (वैकल्पिक)',
        [Language.HINGLISH]: '2. Aur batao (optional)',
    },
    tellMeMorePlaceholder: {
        [Language.EN]: "e.g., 'I have a big presentation tomorrow...'",
        [Language.HI]: "उदा., 'कल मेरी एक बड़ी प्रस्तुति है...'",
        [Language.HINGLISH]: "e.g., 'Kal mera ek bada presentation hai...'",
    },
    createMyMoodscape: {
        [Language.EN]: 'Create My MoodScape',
        [Language.HI]: 'मेरा मूडस्केप बनाएं',
        [Language.HINGLISH]: 'Mera MoodScape Banao',
    },
    craftingYourEscape: {
        [Language.EN]: 'Crafting your escape...',
        [Language.HI]: 'आपका शांत स्थान बना रहे हैं...',
        [Language.HINGLISH]: 'Aapka escape bana rahe hain...',
    },
    // App.tsx Moodscape view
    yourPocketSanctuary: {
        [Language.EN]: 'Your Pocket Sanctuary',
        [Language.HI]: 'आपकी अपनी शांति की जगह',
        [Language.HINGLISH]: 'Aapka Pocket Sanctuary',
    },
    findYourCalm: {
        [Language.EN]: 'Find your calm. Select a mood or describe your feelings to begin a personalized wellness session.',
        [Language.HI]: 'अपनी शांति खोजें। व्यक्तिगत कल्याण सत्र शुरू करने के लिए एक मूड चुनें या अपनी भावनाओं का वर्णन करें।',
        [Language.HINGLISH]: 'Apna calm dhoondho. Ek mood select karo ya apni feelings batao ek personal wellness session ke liye.',
    },
    // TherapySession.tsx
    yourNarratedScene: {
        [Language.EN]: 'Your Narrated Scene',
        [Language.HI]: 'आपका सुनाया गया दृश्य',
        [Language.HINGLISH]: 'Aapka Narrated Scene',
    },
    your60SecondAction: {
        [Language.EN]: 'Your 60-Second Action',
        [Language.HI]: 'आपकी ६०-सेकंड की क्रिया',
        [Language.HINGLISH]: 'Aapka 60-Second Action',
    },
    startGuidedBreathing: {
        [Language.EN]: 'Start Guided Breathing',
        [Language.HI]: 'निर्देशित श्वास शुरू करें',
        [Language.HINGLISH]: 'Guided Breathing Shuru Karein',
    },
    stopListening: {
        [Language.EN]: 'Stop Listening',
        [Language.HI]: 'सुनना बंद करें',
        [Language.HINGLISH]: 'Sunna Band Karein',
    },
    listenToScene: {
        [Language.EN]: 'Listen to Scene',
        [Language.HI]: 'दृश्य सुनें',
        [Language.HINGLISH]: 'Scene Suno',
    },
    createCalmingVideo: {
        [Language.EN]: 'Create Calming Video',
        [Language.HI]: 'शांत वीडियो बनाएं',
        [Language.HINGLISH]: 'Calming Video Banao',
    },
    saveWallpaper: {
        [Language.EN]: 'Save Wallpaper',
        [Language.HI]: 'वॉलपेपर सेव करें',
        [Language.HINGLISH]: 'Wallpaper Save Karo',
    },
    startOver: {
        [Language.EN]: 'Start Over',
        [Language.HI]: 'फिर से शुरू करें',
        [Language.HINGLISH]: 'Phir Se Shuru Karo',
    },
    // LandingPage.tsx
    heroTitle: {
        [Language.EN]: 'Find Your Calm in an Instant.',
        [Language.HI]: 'पल भर में अपनी शांति पाएं।',
        [Language.HINGLISH]: 'Ek Instant mein Calm Paayein.',
    },
    heroSubtitle: {
        [Language.EN]: 'MoodScape is your AI-powered pocket sanctuary, creating personalized wellness sessions to help you navigate stress, anxiety, and find your focus.',
        [Language.HI]: 'मूडस्केप आपकी एआई-संचालित पॉकेट सैंक्चुअरी है, जो तनाव, चिंता से निपटने और अपना ध्यान केंद्रित करने में आपकी मदद करने के लिए व्यक्तिगत कल्याण सत्र बनाता है।',
        [Language.HINGLISH]: 'MoodScape aapka AI-powered pocket sanctuary hai, jo stress, anxiety navigate karne aur focus paane mein help karne ke liye personalized wellness sessions banata hai.',
    },
    getStartedForFree: {
        [Language.EN]: 'Get Started for Free',
        [Language.HI]: 'मुफ्त में शुरू करें',
        [Language.HINGLISH]: 'Free mein Shuru Karein',
    },
};

export const useTranslations = (language: Language) => {
    const t = (key: keyof typeof translations): string => {
        const translationSet = translations[key];
        if (!translationSet) {
            // Fix: Explicitly convert key to string to satisfy the return type.
            return key.toString();
        }
        // Fix: Explicitly convert the result to a string to handle cases where a translation might be missing and the key (potentially inferred as a number) is returned.
        return (translationSet[language] || translationSet[Language.EN] || key).toString();
    };
    return { t };
};
