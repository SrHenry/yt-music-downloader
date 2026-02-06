import { downloadThumbnail } from "@/functions/downloadThumbnail.ts";
import { getAlbumName } from "@/functions/getAlbumName.ts";
import { getResolution } from "@/functions/getResolution.ts";
import { getThumbnails } from "@/functions/getThumbnails.ts";
import { cropThumbnail } from "@/functions/cropThumbnail.ts";

/**
 * Fetch the thumbnail from a music YouTube Source
 *
 * @param yt_src Music source
 *
 * @returns A promise with a string path to the thumbnail file.
 */
export async function fetchThumbnail(yt_src: string): Promise<string>;

/**
 * Fetch the thumbnail from a music YouTube Source
 *
 * @param yt_src Music source
 * @param albumName Album name to name the Cover Art (thumbnail)
 *
 * @returns A promise with a string path to the thumbnail file.
 */
export async function fetchThumbnail(
    yt_src: string,
    albumName: string
): Promise<string>;

export async function fetchThumbnail(
    yt_src: string,
    albumName: string | null = null
): Promise<string> {
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

    let thumbnail: Thumbnail;
    let needsCropping = false;

    if (squareThumbnails.length === 0) {
        console.log("No square thumbnails found. Selecting highest resolution thumbnail for cropping...");

        // If no square thumbnails, select the thumbnail with the highest resolution
        const allThumbnailsWithDims = j.filter(
            (thumbnail) => "width" in thumbnail && "height" in thumbnail
        );

        if (allThumbnailsWithDims.length === 0)
            throw new Error("No thumbnails found");

        thumbnail = allThumbnailsWithDims.reduce((t1, t2) =>
            (t1.width ?? 0) > (t2.width ?? 0) ? t1 : t2
        );
        needsCropping = true;
    } else {
        thumbnail = squareThumbnails.reduce((t1, t2) =>
            (t1.width ?? 0) > (t2.width ?? 0) ? t1 : t2
        );
    }

    console.log(
        "Selected Thumbnail ID:",
        thumbnail.id,
        `(${getResolution(thumbnail)})`
    );

    console.log("Downloading thumbnail...");
    const path = await downloadThumbnail(yt_src, thumbnail, albumName);
    console.log("Thumbnail downloaded!");

    // If cropping is needed, crop the thumbnail to 1:1 aspect ratio
    if (needsCropping) {
        console.log("Cropping thumbnail to 1:1 aspect ratio...");
        await cropThumbnail(path, { overwrite: true });
        console.log("Thumbnail cropped!");
    }

    return path;
}
