/**
 * Check if a string is a valid URL
 *
 * @param {string} str
 *
 * @returns {boolean}
 */
export function isValidURL(str) {
    try {
        new URL(str);
        return true;
    } catch {
        return false;
    }
}
