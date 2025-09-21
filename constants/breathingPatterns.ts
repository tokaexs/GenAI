import { NamedBreathingPattern, BreathingPattern } from './types';

export const BOX_BREATHING: NamedBreathingPattern = {
    name: "Box Breathing",
    description: "Equal-length breaths to focus the mind.",
    pattern: {
        inhale: 4,
        hold: 4,
        exhale: 4,
        postExhaleHold: 4,
    },
    isCustom: false,
};

export const RELAXING_BREATH: NamedBreathingPattern = {
    name: "4-7-8 Relax",
    description: "A calming breath to reduce anxiety.",
    pattern: {
        inhale: 4,
        hold: 7,
        exhale: 8,
        postExhaleHold: 0,
    },
    isCustom: false,
};

export const DEEPER_CALM: NamedBreathingPattern = {
    name: "Deeper Calm",
    description: "Longer exhales for deep relaxation.",
    pattern: {
        inhale: 4,
        hold: 4,
        exhale: 6,
        postExhaleHold: 2,
    },
    isCustom: false,
};

export const DEFAULT_PATTERNS: NamedBreathingPattern[] = [
    BOX_BREATHING,
    RELAXING_BREATH,
    DEEPER_CALM,
];

/**
 * Finds a default pattern that matches the given numerical pattern,
 * or creates a new temporary named pattern if no match is found.
 * @param pattern The numerical breathing pattern.
 * @param title A title to use if no match is found.
 * @returns A NamedBreathingPattern object.
 */
export const findOrCreateNamedPattern = (pattern: BreathingPattern, title: string): NamedBreathingPattern => {
    const found = DEFAULT_PATTERNS.find(p =>
        p.pattern.inhale === pattern.inhale &&
        p.pattern.hold === pattern.hold &&
        p.pattern.exhale === pattern.exhale &&
        p.pattern.postExhaleHold === pattern.postExhaleHold
    );

    if (found) {
        return found;
    }

    // If the AI-generated pattern doesn't match a default, create a temporary one for the session.
    return {
        name: title,
        description: "Your AI-suggested pattern.",
        pattern: pattern,
        isCustom: false, // Treat as a default so it doesn't prompt to be saved initially
    };
};
