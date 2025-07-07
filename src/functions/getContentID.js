/**
 * Receives an URL string or object (Youtube URLs) and returns the Content ID.
 *
 * @param {string | URL} url
 * @returns {string | null}
 */
export function getContentID(url) {
    return new URL(url).searchParams.get("v");
}
