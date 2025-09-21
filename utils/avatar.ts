/**
 * Generates a consistent, pseudo-random background color from a string.
 * @param str The input string (e.g., a user's name).
 * @returns A hex color string.
 */
const stringToColor = (str: string): string => {
    if (!str) return '#cccccc'; // Default color for empty string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
};

/**
 * Gets the initials from a full name.
 * @param name The full name.
 * @returns A string with one or two initials.
 */
const getInitials = (name: string): string => {
    if (!name) return '?';
    const names = name.trim().split(' ');
    const firstInitial = names[0] ? names[0][0] : '';
    const lastInitial = names.length > 1 && names[names.length - 1] ? names[names.length - 1][0] : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
};

/**
 * Creates an SVG-based avatar and returns it as a base64 data URL.
 * @param name The user's name to generate the avatar from.
 * @returns A data URL string for the generated SVG image.
 */
export const generateAvatar = (name: string): string => {
    const initials = getInitials(name);
    const bgColor = stringToColor(name);

    // A simple algorithm to determine text color (black or white) based on background brightness.
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const textColor = brightness > 125 ? '#000000' : '#FFFFFF';

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="${bgColor}" />
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="${textColor}" font-size="40" font-family="'Inter', sans-serif" font-weight="600">
        ${initials}
      </text>
    </svg>
  `;

    // Use btoa to encode the SVG string to base64
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};
