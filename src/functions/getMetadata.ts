import { runYtDlp } from "@/functions/runYtDlp.ts";

export async function getMetadata(yt_src: string): Promise<unknown> {
    const args = [
        "--simulate",
        "--quiet",
        "--flat-playlist",
        "--no-warnings",
        "-J",
    ];

    return await runYtDlp(...args, yt_src).then(JSON.parse);
}
