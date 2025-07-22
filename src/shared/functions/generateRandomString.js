/**
 * Generates a random string of a given length.
 *
 * @param {number?} length
 *
 * @returns {string}
 */
export function generateRandomString(length = 12, randomString = "") {
    randomString += Math.random().toString(20).substr(2, length);
    if (randomString.length > length) return randomString.slice(0, length);
    return generateRandomString(length, randomString);
}
