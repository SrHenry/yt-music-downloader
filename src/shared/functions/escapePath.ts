/**
 * Escapes slash characters
 *
 * @param {string} path
 * @returns {string}
 */
export function escapePath(path) {
    return path.replace(/\//g, "\\/");
}
