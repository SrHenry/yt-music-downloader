import { downloadThumbnail } from "./downloadThumbnail.js";
import { getAlbumName } from "./getAlbumName.js";
import { getResolution } from "./getResolution.js";
import { getThumbnails } from "./getThumbnails.js";

/**
 * Fetch the thumbnail from a music YouTube Source
 *
 * @param {string} yt_src
 * @param {string|null} albumName
 *
 * @returns {Promise<string>}
 */
export async function fetchThumbnail(yt_src, albumName = null) {
    if (albumName === null) {
        albumName = await getAlbumName(yt_src);

        console.log("Album Name:", albumName);
    }

    console.log("Fetching thumbnails...");
    const j = await getThumbnails(yt_src);

    const squareThumbnails = j.filter(
        (thumbnail) =>
            "width" in thumbnail && thumbnail.width === thumbnail.height
    );

    if (squareThumbnails.length === 0)
        throw new Error("No square aspect ratio thumbnails found");

    /** Biggest square aspect ratio thumbnail (Album Cover Art) */
    const thumbnail = squareThumbnails.reduce((t1, t2) =>
        t1.width > t2.width ? t1 : t2
    );

    console.log(
        "Selected Thumbnail ID:",
        thumbnail.id,
        `(${getResolution(thumbnail)})`
    );

    console.log("Downloading thumbnail...");
    const path = await downloadThumbnail(yt_src, thumbnail, albumName);
    console.log("Thumbnail downloaded!");

    return path;
}
