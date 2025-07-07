import { runYtDlp } from "./runYtDlp.js";

/**
 * Download music from YouTube/YT Music using a URL or Content ID.
 *
 * @param {string} yt_src
 *
 * @returns {Promise<string>}
 *
 * @throws {Error}
 */
export function downloadMusic(yt_src) {
    const args = [
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
        yt_src,
    ];

    return runYtDlp(...args);
}
