export enum Language {
    EN = 'English',
    HI = 'Hindi',
    HINGLISH = 'Hinglish (Hindi-English mix)',
}

export type ActiveView = 'dashboard' | 'create' | 'moodscape_creation' | 'resilience_quest' | 'vision_board' | 'chat' | 'pricing' | 'profile' | 'about' | 'moodscape' | 'community_gallery' | 'public_pricing';
export type Theme = 'light' | 'dark';

export interface LanguageOption {
    label: string;
    value: Language;
}

export interface Mood {
    name: string;
    emoji: string;
    value: string;
}

export interface MoodInput {
    mood: string;
    context: string;
    intensity: number;
    color: string;
}

export interface BreathingPattern {
    inhale: number;
    hold: number;
    exhale: number;
    postExhaleHold: number;
}

export interface NamedBreathingPattern {
    name: string;
    description?: string;
    pattern: BreathingPattern;
    isCustom?: boolean;
}

export interface MicroAction {
    title: string;
    type: 'breathing' | 'grounding';
    steps: string[];
    pattern?: BreathingPattern;
}

export interface TherapyBundle {
    affirmation: string;
    narrationScript: string;
    imageUrl: string;
    imagePrompt: string;
    microAction: MicroAction;
    soundscapeUrl?: string;
    soundscapeType?: 'rain' | 'forest' | 'ocean' | 'ambient' | 'default';
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export interface SessionHistoryItem {
    date: string;
    mood: string;
    context: string;
    affirmation: string;
    imageUrl?: string; // Added for gallery sharing
}

export interface GalleryItem {
    id: string;
    imageUrl: string;
    affirmation: string;
}

export interface UserLevel {
    level: number;
    name: string;
    threshold: number;
    style: {
        borderColor?: string;
        glowColor?: string;
    };
    icon?: React.ReactNode;
}