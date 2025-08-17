/**
 * Check if a string is a valid URL
 */
export function isValidURL(str: string): boolean {
    try {
        new URL(str);
        return true;
    } catch {
        return false;
    }
}
