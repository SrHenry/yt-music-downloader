import { downloadThumbnail } from "@/functions/downloadThumbnail.ts";
import { getAlbumName } from "@/functions/getAlbumName.ts";
import { getResolution } from "@/functions/getResolution.ts";
import { getThumbnails } from "@/functions/getThumbnails.ts";

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

    if (squareThumbnails.length === 0)
        throw new Error("No square aspect ratio thumbnails found");

    /** Biggest square aspect ratio thumbnail (Album Cover Art) */
    const thumbnail = squareThumbnails.reduce((t1, t2) =>
        (t1.width ?? 0) > (t2.width ?? 0) ? t1 : t2
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
