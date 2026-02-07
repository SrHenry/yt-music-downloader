import { rename as move } from "node:fs/promises";
import { basename, resolve } from "node:path";

import { ROOT_PATH } from "@/constants.ts";
import { runFFmpeg } from "@/functions/runFFmpeg.ts";
import { fileExists } from "@/shared/functions/fileExists.ts";
import { logProcess } from "@/shared/pipelines/logProcess.ts";

/**
 * It embeds a thumbnail into a music file. Uses FFmpeg under the hood to achieve it.
 *
 * @param music_file string path to the music file
 * @param thumbnail_file string path to the thumbnail file
 */
export async function embedThumbnail(
    music_file: string,
    thumbnail_file: string,
): Promise<void> {
    const output_path = resolve(ROOT_PATH, "out", basename(music_file));
    const args = [
        "-hide_banner",
        // "-loglevel",
        // "error",
        "-i",
        music_file, // `"${music_file}"`,
        "-i",
        thumbnail_file, // `"${thumbnail_file}"`,
        "-map",
        "0:a",
        "-map",
        "1",
        "-codec",
        "copy",
        "-metadata:s:v",
        'title="Album cover"',
        "-metadata:s:v",
        'comment="Cover (front)"',
        "-disposition:v",
        "attached_pic",
        output_path, // `"${output_path}"`,
    ];

    await runFFmpeg(...args).then(logProcess("ffmpeg"));

    if (!(await fileExists(output_path)))
        throw new Error(
            "Failed to embed thumbnail! check FFmpeg logs for more info.",
        );

    await move(output_path, music_file);
}
