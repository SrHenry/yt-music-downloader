import { exec } from "../shared/functions/exec.ts";

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
        return await exec("ffmpeg", ...args);
    } catch ({ message }) {
        return message;
    }
}
