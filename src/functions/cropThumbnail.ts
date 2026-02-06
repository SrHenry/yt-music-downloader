import type { CropOptions } from "@/types/crop.ts";

import { copyFile, rm } from "node:fs/promises";
import { basename, resolve } from "node:path";

import { DEFAULT_CROP_OPTIONS } from "@/constants.ts";
import { cropToSquare } from "@/functions/cropToSquare.ts";
import { fileExists } from "@/shared/functions/fileExists.ts";

/**
 * Crops an image to a 1:1 (square) aspect ratio and optionally overwrites the original file.
 *
 * @param inputPath Path to the input image file
 * @param options Optional cropping configuration
 * @returns Path to the output (cropped) image file
 */
export async function cropThumbnail(
    inputPath: string,
    {
        overwrite = DEFAULT_CROP_OPTIONS.overwrite,
        tempDirectory = DEFAULT_CROP_OPTIONS.tempDirectory,
    }: CropOptions = {},
): Promise<string> {
    const croppedPath = resolve(
        tempDirectory,
        `cropped-${basename(inputPath)}`,
    );

    await cropToSquare(inputPath, tempDirectory);

    if (!(await fileExists(croppedPath))) {
        throw new Error(
            `Failed to crop thumbnail! Cropped file was not created.`,
        );
    }

    if (overwrite) {
        // Use copy + unlink instead of rename to support cross-device operations
        await copyFile(croppedPath, inputPath);
        await rm(croppedPath);

        return inputPath;
    }

    return croppedPath;
}
