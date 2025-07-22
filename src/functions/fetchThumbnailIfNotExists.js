import { resolve } from "node:path";

import { THUMBNAILS_PATH } from "../shared/constants.js";
import { fileExists } from "../shared/functions/fileExists.js";
import { fetchThumbnail } from "./fetchThumbnail.js";
import { getAlbumName } from "./getAlbumName.js";

/**
 * Fetches the thumbnail of a YT Source and returns its path
 *
 * @param {string} yt_src
 *
 * @returns {Promise<string>}
 */
export async function fetchThumbnailIfNotExists(yt_src) {
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
