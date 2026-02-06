import { resolve } from "node:path";

import { ROOT_PATH } from "@/constants.ts";
import { runFFmpeg } from "@/functions/runFFmpeg.ts";

/**
 * Crops an image to a 1:1 (square) aspect ratio using FFmpeg.
 *
 * The crop is performed from the center of the image, maintaining the
 * highest possible resolution by taking the minimum of width and height.
 *
 * @param inputPath Path to the input image file
 * @returns Path to the output (cropped) image file
 */
export async function cropToSquare(inputPath: string): Promise<string> {
    const directory = resolve(ROOT_PATH, "out/crop");
    const basename = require("node:path").basename(inputPath);
    const outputPath = resolve(directory, `cropped-${basename}`);

    await runFFmpeg(
        "-hide_banner",
        "-i",
        `"${inputPath}"`,
        "-vf",
        '"crop=min(iw\\,ih):min(iw\\,ih):(iw-min(iw\\,ih))/2:(ih-min(iw\\,ih))/2"',
        "-y",
        `"${outputPath}"`,
    );

    return outputPath;
}
