import { join } from "node:path";

import { getAlbumName } from "@/functions/getAlbumName.ts";
import { THUMBNAILS_PATH } from "@/shared/constants.ts";
import { downloadAsFile } from "@/shared/functions/download.ts";

/**
 * Downloads a thumbnail from a given URL and saves it to the THUMBNAILS_PATH.
 *
 * @param yt_src Music source
 * @param thumbnail Thumbnail object map entry from YouTube/YTDlp
 *
 * @returns A promise with a string path to the thumbnail file.
 */
export async function downloadThumbnail(
    yt_src: string,
    thumbnail: Thumbnail
): Promise<string>;

/**
 * Downloads a thumbnail from a given URL and saves it to the THUMBNAILS_PATH.
 *
 * @param yt_src Music source
 * @param thumbnail Thumbnail object map entry from YouTube/YTDlp
 * @param albumName Album name to name the Cover Art (thumbnail)
 *
 * @returns A promise with a string path to the thumbnail file.
 */
export async function downloadThumbnail(
    yt_src: string,
    thumbnail: Thumbnail,
    albumName: string
): Promise<string>;

export async function downloadThumbnail(
    yt_src: string,
    thumbnail: Thumbnail,
    albumName: string | null = null
): Promise<string> {
    const { url } = thumbnail;

    if (!albumName) albumName = await getAlbumName(yt_src);

    albumName = albumName.replace(/\//g, "-");

    const filename = `${albumName}.jpg`;

    await downloadAsFile(url, filename, THUMBNAILS_PATH);

    return join(THUMBNAILS_PATH, filename);
}
