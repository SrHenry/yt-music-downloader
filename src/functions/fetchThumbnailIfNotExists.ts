import { resolve } from "node:path";

import { THUMBNAILS_PATH } from "../shared/constants.ts";
import { fileExists } from "../shared/functions/fileExists.ts";
import { fetchThumbnail } from "./fetchThumbnail.ts";
import { getAlbumName } from "./getAlbumName.ts";

/**
 * Fetches the thumbnail of a YT Source and returns its path
 *
 * @param yt_src Music source
 *
 * @returns A promise with the string path to the thumbnail file.
 */
export async function fetchThumbnailIfNotExists(
    yt_src: string
): Promise<string> {
    console.log("Fetching album name...");
    const albumName = await getAlbumName(yt_src);

    console.log("Album Name:", albumName);

    const path = resolve(THUMBNAILS_PATH, `${albumName}.jpg`);

    console.log("Checking if thumbnail is already downloaded...");

    if (await fileExists(path)) {
        console.log("Thumbnail is already downloaded!");
        return path;
    }

    return fetchThumbnail(yt_src, albumName);
}
