/**
 * Escapes slash characters in a path-like string
 */
export function escapePath(path: string): string {
    return path.replace(/\//g, "\\/");
}
