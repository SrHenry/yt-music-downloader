/**
 * Extracts the resolution of a thumbnail object.
 *
 * @param {Thumbnail} thumbnail
 * @returns {string}
 */
export function getResolution(thumbnail) {
    if ("resolution" in thumbnail) return thumbnail.resolution;

    if ("width" in thumbnail && "height" in thumbnail)
        return `${thumbnail.width}x${thumbnail.height}`;

    return "unknown";
}
