import { rename as move, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

import { ROOT_PATH } from "../shared/constants.js";
import { fileExists } from "../shared/functions/fileExists.js";
import { runFFmpeg } from "./runFFmpeg.js";

/**
 * It embeds a thumbnail into a music file. Uses FFmpeg under the hood to achieve it.
 *
 * @param {string} music_file
 * @param {string} thumbnail_file
 *
 * @returns {Promise<void>}
 */
export async function embedThumbnail(music_file, thumbnail_file) {
    const output_path = resolve(ROOT_PATH, "out", basename(music_file));
    const args = [
        "-hide_banner",
        // "-loglevel",
        // "error",
        "-i",
        `"${music_file}"`,
        "-i",
        `"${thumbnail_file}"`,
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
        `"${output_path}"`,
    ];

    await runFFmpeg(...args).then((output) =>
        writeFile(
            resolve(
                ROOT_PATH,
                "logs/ffmpeg",
                new Date()
                    .toISOString()
                    .replace("T", "_")
                    .replace(/:/g, "-")
                    .concat(".log")
            ),
            output
        )
    );

    if (!(await fileExists(output_path)))
        throw new Error(
            "Failed to embed thumbnail! check FFmpeg logs for more info."
        );

    await move(output_path, music_file);
}
