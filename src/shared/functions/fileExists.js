import { access, constants } from "node:fs/promises";

/**
 * Checks if a file exists.
 *
 * @param {string} path
 *
 * @returns {Promise<boolean>}
 */
export async function fileExists(path) {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch {
        return false;
    }
}
