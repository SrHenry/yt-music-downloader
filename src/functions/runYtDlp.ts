import { exec } from "@/shared/functions/exec.ts";

/**
 * Runs yt-dlp in the shell and returns the output. Throws an error if the command fails.
 *
 * @param args List of arguments to feed yt-dlp binary
 *
 * @returns A promise with the data printed by yt-dlp to stdout
 *
 * @throws {Error}
 */
export function runYtDlp(...args: string[]): Promise<string> {
    return exec("yt-dlp", ...args);
}
