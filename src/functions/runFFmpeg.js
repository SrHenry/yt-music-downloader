import { run } from "../shared/functions/run.js";

/**
 * Runs ffmpeg in the shell and returns the output.
 *
 * @param  {...string} args
 *
 * @returns {Promise<string>}
 *
 * @throws {Error}
 */
export async function runFFmpeg(...args) {
    try {
        return await run("ffmpeg", ...args);
    } catch ({ message }) {
        return message;
    }
}
