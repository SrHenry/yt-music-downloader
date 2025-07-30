import { join } from "node:path";

import { THUMBNAILS_PATH } from "../shared/constants.ts";
import { downloadAsFile } from "../shared/functions/download.ts";
import { getAlbumName } from "./getAlbumName.ts";

/**
 * Downloads a thumbnail from a given URL and saves it to the THUMBNAILS_PATH.
 *
 * @param {string} yt_src
 * @param {Thumbnail} thumbnail
 * @param {string} albumName
 *
 * @returns {Promise<string>}
 */
export async function downloadThumbnail(yt_src, thumbnail, albumName = false) {
    const { url } = thumbnail;

    if (!albumName) albumName = await getAlbumName(yt_src);

    albumName = albumName.replace(/\//g, "-");

    const filename = `${albumName}.jpg`;

    await downloadAsFile(url, filename, THUMBNAILS_PATH);

    return join(THUMBNAILS_PATH, filename);
}
