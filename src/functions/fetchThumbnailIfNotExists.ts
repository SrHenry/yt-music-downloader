import { resolve } from "node:path";

import { fetchThumbnail } from "@/functions/fetchThumbnail.ts";
import { getAlbumName } from "@/functions/getAlbumName.ts";
import { THUMBNAILS_PATH } from "@/shared/constants.ts";
import { fileExists } from "@/shared/functions/fileExists.ts";
import type { YouTubeMusicMetadata } from "@/workflow/pipelines/download/music/types/YouTubeMusicMetadata.ts";

/**
 * Fetches the thumbnail of a YT Source and returns its path
 *
 * @param yt_src Music source
 *
 * @returns A promise with the string path to the thumbnail file.
 */
export async function fetchThumbnailIfNotExists(
    yt_src: string
): Promise<string>;

/**
 * Fetches the thumbnail of a YT Source and returns its path
 *
 * @param yt_src Music source
 * @param thumbnailDir Directory to save the thumbnail
 *
 * @returns A promise with the string path to the thumbnail file.
 */
export async function fetchThumbnailIfNotExists(
    yt_src: string,
    thumbnailDir: string | null
): Promise<string>;

/**
 * Fetches the thumbnail of a YT Source and returns its path
 *
 * @param yt_src Music source
 * @param thumbnailDir Directory to save the thumbnail
 * @param musicMetadata music metadata if already fetched
 *
 * @returns A promise with the string path to the thumbnail file.
 */
export async function fetchThumbnailIfNotExists(
    yt_src: string,
    thumbnailDir: string | null,
    musicMetadata: YouTubeMusicMetadata | null
): Promise<string>;

export async function fetchThumbnailIfNotExists(
    yt_src: string,
    thumbnailDir: string | null = null,
    musicMetadata: YouTubeMusicMetadata | null = null
): Promise<string> {
    let albumName: string;

    if (!musicMetadata) {
        console.log("Fetching album name...");
        albumName = await getAlbumName(yt_src);

        console.log("Album Name:", albumName);
    } else albumName = musicMetadata.album;

    const path = resolve(thumbnailDir ?? THUMBNAILS_PATH, `${albumName}.jpg`);

    console.log("Checking if thumbnail is already downloaded...");

    if (await fileExists(path)) {
        console.log("Thumbnail is already downloaded!");
        return path;
    }

    return fetchThumbnail(
        yt_src,
        albumName,
        thumbnailDir,
        musicMetadata?.thumbnails ?? null
    );
}
