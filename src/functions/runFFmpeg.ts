import { object, string } from "@srhenry/type-utils";
import { exec } from "../shared/functions/exec.ts";

const hasMessage = object({
    message: string(),
});

/**
 * Runs ffmpeg in the shell and returns the output.
 *
 * @param  {...string} args
 *
 * @returns {Promise<string>}
 *
 * @throws {Error}
 */
export async function runFFmpeg(...args: string[]): Promise<string> {
    try {
        return await exec("ffmpeg", ...args);
    } catch (err) {
        if (hasMessage(err)) return err.message;

        throw err;
    }
}
