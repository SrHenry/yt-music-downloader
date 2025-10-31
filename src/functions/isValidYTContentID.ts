import { runYtDlp } from "@/functions/runYtDlp.ts";

/**
 * Checks if a YT source is valid.
 *
 * @param yt_src Music source
 */
export async function isValidYTContentID(yt_src: string) {
    try {
        const args = [
            "--simulate",
            "--quiet",
            "--flat-playlist",
            "--no-warnings",
        ];

        await runYtDlp(...args, yt_src);

        return true;
    } catch {
        return false;
    }
}
