import { exec } from "../shared/functions/exec.ts";

/**
 * Runs yt-dlp in the shell and returns the output. Throws an error if the command fails.
 *
 * @param  {...string} args
 *
 * @returns {Promise<string>}
 *
 * @throws {Error}
 */
export function runYtDlp(...args) {
    return exec("yt-dlp", ...args);
}
