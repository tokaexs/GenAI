/**
 * Triggers subtle haptic feedback for interactions, if supported by the browser.
 * Supports different patterns for varying levels of feedback intensity.
 * @param type The type of vibration feedback. Defaults to 'light'.
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate
 */

type HapticFeedbackType = 'light' | 'medium' | 'heavy';

const patterns: Record<HapticFeedbackType, VibratePattern> = {
    light: 50,          // A single, short pulse
    medium: [100, 50, 100], // Two short pulses
    heavy: 150,         // A longer, more pronounced pulse
};


export const triggerHapticFeedback = (type: HapticFeedbackType = 'light'): void => {
    if (window.navigator && 'vibrate' in window.navigator) {
        try {
            const pattern = patterns[type];
            window.navigator.vibrate(pattern);
        } catch (e) {
            // Vibration can fail on some browsers if not triggered by a user gesture,
            // but we are safe here since these are direct click handlers.
            console.warn("Haptic feedback failed.", e);
        }
    }
};