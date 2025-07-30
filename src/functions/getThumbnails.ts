import { runYtDlp } from "./runYtDlp.js";

/**
 * Fetches from the API the thumbnails metadata of a given YouTube source.
 *
 * @param {string} yt_src
 *
 * @returns {Promise<Thumbnail[]>}
 */
export async function getThumbnails(yt_src) {
    const args = ["-q", "--no-warnings", "--print", "thumbnails", "-s", yt_src];

    const output = await runYtDlp(...args);

    return JSON.parse(output.replaceAll("'", '"'));
}
