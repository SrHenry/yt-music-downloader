import { runYtDlp } from "@/functions/runYtDlp.ts";

/**
 * Fetches the album name of a given YouTube source when available.
 *
 * @param yt_src Music source
 *
 * @returns A promise with the Album name.
 */
export function getAlbumName(yt_src: string): Promise<string> {
    const args = ["-q", "--no-warnings", "--print", "album", "-s", yt_src];

    return runYtDlp(...args);
}
