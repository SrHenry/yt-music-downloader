/**
 * Receives an URL string or object (Youtube URLs) and returns the Content ID.
 *
 * @param url YouTube URL string or object
 *
 * @returns YouTube ID or null if not found embedded in URL
 */
export function getContentID(url: string | URL): string | null {
    return new URL(url).searchParams.get("v");
}
