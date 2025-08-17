import { access, constants } from "node:fs/promises";

/**
 * Checks if a file exists in a given path.
 */
export async function fileExists(path: string): Promise<boolean> {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch {
        return false;
    }
}
