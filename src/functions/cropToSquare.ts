import { basename, resolve } from "node:path";

import { DEFAULT_CROP_OPTIONS } from "@/constants.ts";
import { runFFmpeg } from "@/functions/runFFmpeg.ts";
import { createDirIfNotExists } from "@/shared/functions/createDirIfNotExists.ts";
import { logProcess } from "@/shared/pipelines/logProcess.ts";

/**
 * Crops an image to a 1:1 (square) aspect ratio using FFmpeg.
 *
 * The crop is performed from the center of the image, maintaining the
 * highest possible resolution by taking the minimum of width and height.
 *
 * @param inputPath Path to the input image file
 * @returns Path to the output (cropped) image file
 */
export async function cropToSquare(
    inputPath: string,
    tempDirectory = DEFAULT_CROP_OPTIONS.tempDirectory,
): Promise<string> {
    const outputPath = resolve(tempDirectory, `cropped-${basename(inputPath)}`);

    await createDirIfNotExists(tempDirectory);
    await runFFmpeg(
        "-hide_banner",
        "-i",
        inputPath,
        "-vf",
        // Escape commas with backslashes to prevent ffmpeg from interpreting them as filter separators
        // Need quadruple backslash in TypeScript source to get double backslash at runtime
        "crop=min(iw\\\\,ih):min(iw\\\\,ih):(iw-min(iw\\\\,ih))/2:(ih-min(iw\\\\,ih))/2",
        "-y",
        outputPath,
    ).then(logProcess("ffmpeg"));

    return outputPath;
}
