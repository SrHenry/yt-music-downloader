import { cropThumbnail } from "@/functions/cropThumbnail.ts";
import { downloadThumbnail } from "@/functions/downloadThumbnail.ts";
import { getAlbumName } from "@/functions/getAlbumName.ts";
import { getResolution } from "@/functions/getResolution.ts";
import { getThumbnails } from "@/functions/getThumbnails.ts";
import { selectThumbnail } from "@/functions/selectThumbnail.ts";

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
    albumName: string,
): Promise<string>;

export async function fetchThumbnail(yt_src: string): Promise<string>;

/**
 * Fetch the thumbnail from a music YouTube Source
 *
 * @param yt_src Music source
 * @param albumName Album name to name the Cover Art (thumbnail)
 * @param thumbnailDir Path to where to download the thumbnail
 *
 * @returns A promise with a string path to the thumbnail file.
 */
export async function fetchThumbnail(
    yt_src: string,
    albumName: string | null,
    thumbnailDir: string | null,
): Promise<string>;

/**
 * Fetch the thumbnail from a music YouTube Source
 *
 * @param yt_src Music source
 * @param albumName Album name to name the Cover Art (thumbnail)
 * @param thumbnailDir Path to where to download the thumbnail
 * @param thumbnailMetadata Thumbnail metadata if already fetched
 *
 * @returns A promise with a string path to the thumbnail file.
 */
export async function fetchThumbnail(
    yt_src: string,
    albumName: string | null,
    thumbnailDir: string | null,
    thumbnailMetadata: Thumbnail[] | null,
): Promise<string>;

export async function fetchThumbnail(
    yt_src: string,
    albumName: string | null = null,
    thumbnailDir: string | null = null,
    thumbnailMetadata: Thumbnail[] | null = null,
): Promise<string> {
    if (albumName === null) {
        albumName = await getAlbumName(yt_src);

        console.log("Album Name:", albumName);
    }

    if (!thumbnailMetadata) {
        console.log("Fetching thumbnails...");
        thumbnailMetadata = await getThumbnails(yt_src);
        console.log("Thumbnails fetched!");
    }

    const { thumbnail, needsCropping } = selectThumbnail(thumbnailMetadata);

    console.log(
        "Selected Thumbnail ID:",
        thumbnail.id,
        `(${getResolution(thumbnail)})`,
    );

    console.log("Downloading thumbnail...");
    const path = await downloadThumbnail(
        yt_src,
        thumbnail,
        albumName,
        thumbnailDir,
    );
    console.log("Thumbnail downloaded!");

    if (needsCropping) {
        console.log("Cropping thumbnail to 1:1 aspect ratio...");
        await cropThumbnail(path);
        console.log("Thumbnail cropped!");
    }

    return path;
}
