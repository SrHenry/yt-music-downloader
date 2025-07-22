import { run } from "../shared/functions/run.js";

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
    return run("yt-dlp", ...args);
}
