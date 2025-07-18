import { runYtDlp } from "./runYtDlp.js";

export async function isValidYTContentID(yt_src) {
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
