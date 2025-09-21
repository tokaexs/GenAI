import React from 'react';
import { Mood, Language, LanguageOption, UserLevel, GalleryItem } from './types';

export const MOODS: Mood[] = [
    { name: 'Stressed', emoji: '😥', value: 'stressed and overwhelmed' },
    { name: 'Anxious', emoji: '😟', value: 'anxious and worried' },
    { name: 'Sad', emoji: '😢', value: 'sad and feeling down' },
    { name: 'Tired', emoji: '😴', value: 'mentally and physically tired' },
    { name: 'Okay', emoji: '😐', value: 'feeling just okay' },
    { name: 'Happy', emoji: '😊', value: 'happy and content' },
];

export const LANGUAGES: LanguageOption[] = [
    { label: 'English', value: Language.EN },
    { label: 'हिन्दी', value: Language.HI },
    { label: 'Hinglish', value: Language.HINGLISH },
];

export const HELPLINE_INFO = {
    title: "Important Support Available",
    message: "It sounds like you are going through a very difficult time. It's really important to talk to someone who can help right now. Please reach out to a professional.",
    resources: [
        { name: "KIRAN Mental Health Helpline (24/7)", number: "1800-599-0019" },
    ]
};

export const QUOTES: string[] = [
    "Believe in yourself", "Take one step at a time", "Stay calm, stay strong",
    "You are doing better than you think", "Focus on what you can control",
    "Small progress is still progress", "Be patient with yourself",
    "Your effort will pay off", "Keep moving forward", "Better days are coming",
    "Every day is a fresh start", "Don't compare, just improve",
    "Your hard work matters", "Stay positive, work hard, be consistent",
    "Difficulties make you stronger", "You are capable of more than you know",
    "Don't lose hope", "Rest but don't quit", "You grow through what you go through",
    "Stay focused on your journey", "Dream big, start small", "Keep your head up",
    "Slow progress is still progress", "Don't let fear hold you back", "Trust yourself",
    "Challenges are temporary", "You are stronger than your stress",
    "Don't give up on yourself", "Keep faith in the process", "Turn pain into power",
    "Focus on your growth", "Your journey is unique", "Stay patient, stay hopeful",
    "Everything will fall into place", "Control your thoughts, control your life",
    "Success starts with discipline", "Take care of your mind",
    "Stay consistent, results will follow", "Hard times never last",
    "Believe in your strength"
];


export interface VisualTheme {
    id: string;
    name: string;
    emoji: string;
}

export const VISUAL_THEMES: VisualTheme[] = [
    { id: 'aurora', name: 'Aurora', emoji: '🌌' },
    { id: 'forest', name: 'Forest', emoji: '🌲' },
    { id: 'ocean', name: 'Ocean', emoji: '🌊' },
    { id: 'nightsky', name: 'Night Sky', emoji: '✨' },
];

export const SOUNDSCAPE_MAP = {
    rain: 'https://cdn.pixabay.com/audio/2022/10/21/audio_191925b444.mp3',
    forest: 'https://cdn.pixabay.com/audio/2022/08/03/audio_543943316c.mp3',
    ocean: 'https://cdn.pixabay.com/audio/2023/09/14/audio_51ae85863c.mp3',
    ambient: 'https://cdn.pixabay.com/audio/2024/05/20/audio_252273062f.mp3',
    default: 'https://cdn.pixabay.com/audio/2022/02/07/audio_c68a1526b7.mp3', // A neutral ambient track
};

export const USER_LEVELS: UserLevel[] = [
    { level: 1, name: "Sprout", threshold: 0, style: {} },
    { level: 2, name: "Seedling", threshold: 5, style: { borderColor: 'border-emerald-500/50' } },
    // Fix: Replaced JSX with string emojis to fix parsing errors in a .ts file.
    { level: 3, name: "Sapling", threshold: 10, style: { borderColor: 'border-cyan-500/60', glowColor: 'shadow-cyan-500/20' }, icon: '🌱' },
    { level: 4, name: "Flourishing", threshold: 25, style: { borderColor: 'border-fuchsia-500/70', glowColor: 'shadow-fuchsia-500/30' }, icon: '✨' },
    { level: 5, name: "Sanctuary Guardian", threshold: 50, style: { borderColor: 'border-amber-400/80', glowColor: 'shadow-amber-400/40' }, icon: '🌟' },
];

export const GALLERY_ITEMS: GalleryItem[] = [
    { id: '1', imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600', affirmation: 'Calmness is a superpower.' },
    { id: '2', imageUrl: 'https://images.pexels.com/photos/1528640/pexels-photo-1528640.jpeg?auto=compress&cs=tinysrgb&w=600', affirmation: 'Every breath is a new beginning.' },
    { id: '3', imageUrl: 'https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=600', affirmation: 'I am strong, I am resilient.' },
    { id: '4', imageUrl: 'https://images.pexels.com/photos/1423600/pexels-photo-1423600.jpeg?auto=compress&cs=tinysrgb&w=600', affirmation: 'My mind is a peaceful place.' },
    { id: '5', imageUrl: 'https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=600', affirmation: 'I choose to focus on what I can control.' },
    { id: '6', imageUrl: 'https://images.pexels.com/photos/2086622/pexels-photo-2086622.jpeg?auto=compress&cs=tinysrgb&w=600', affirmation: 'It is okay to not be okay.' },
    { id: '7', imageUrl: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=600', affirmation: 'Stillness is where I find myself.' },
    { id: '8', imageUrl: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=600', affirmation: 'I embrace the journey.' },
    { id: '9', imageUrl: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=600', affirmation: 'I am exactly where I need to be.' },
    { id: '10', imageUrl: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=600', affirmation: 'My potential is limitless.' },
];