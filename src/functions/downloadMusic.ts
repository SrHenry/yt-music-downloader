import { runYtDlp } from "@/functions/runYtDlp.ts";

const defaultArgs = [
    "-q",
    "--no-warnings",
    "-x",
    "--audio-format",
    "flac",
    "--audio-quality",
    "0",
    "--embed-metadata",
    "--print",
    "after_move:filepath",
];

/**
 * Download music from YouTube/YT Music using a URL or Content ID.
 *
 * @param yt_src Music source
 *
 * @returns A promise with a string path to the music file in filesystem
 *
 * @throws {Error}
 */
export function downloadMusic(
    yt_src: string,
    args = defaultArgs,
    skipDefaultArgs = false
): Promise<string> {
    if (args !== defaultArgs && !skipDefaultArgs)
        return runYtDlp(...defaultArgs, ...args, yt_src);

    return runYtDlp(...args, yt_src);
}
