import { runYtDlp } from "./runYtDlp.ts";

/**
 * Fetches the album name of a given YouTube source when available.
 *
 * @param {string} yt_src
 *
 * @returns {Promise<string>}
 */
export function getAlbumName(yt_src) {
    const args = ["-q", "--no-warnings", "--print", "album", "-s", yt_src];

    return runYtDlp(...args);
}
