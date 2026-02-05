import { object, string } from "@srhenry/type-utils";

import { execFile } from "@/shared/functions/execFile.ts";

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
        return await execFile("ffmpeg", ...args);
    } catch (err) {
        if (hasMessage(err)) return err.message;

        throw err;
    }
}
