/**
 * Generates a random string.
 */
export function generateRandomString(): string;

/**
 * Generates a random string of a given length.
 *
 * @param length
 */
export function generateRandomString(length: number): string;

/**
 * Generates a random string of a given length.
 *
 * @internal
 * @param length
 * @param randomString
 * @returns {string}
 */
export function generateRandomString(
    length: number,
    randomString: string
): string;

export function generateRandomString(
    length: number = 12,
    randomString = ""
): string {
    randomString += Math.random().toString(20).substr(2, length);
    if (randomString.length > length) return randomString.slice(0, length);
    return generateRandomString(length, randomString);
}
