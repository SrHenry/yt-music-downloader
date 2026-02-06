import { rename as move, rm } from "node:fs/promises";
import { basename, resolve } from "node:path";

import { cropToSquare } from "./cropToSquare.ts";
import { DEFAULT_CROP_OPTIONS } from "@/constants.ts";
import type { CropOptions } from "@/types/crop.ts";
import { ROOT_PATH } from "@/constants.ts";
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
    options: CropOptions = DEFAULT_CROP_OPTIONS
): Promise<string> {
    const tempDirectory = resolve(ROOT_PATH, "out/crop");
    const croppedPath = resolve(tempDirectory, `cropped-${basename(inputPath)}`);

    // Crop the image to square
    await cropToSquare(inputPath);

    // Check if the cropped file was created
    if (!(await fileExists(croppedPath))) {
        throw new Error(`Failed to crop thumbnail! Cropped file was not created.`);
    }

    // If overwrite is true, replace the original file with the cropped version
    if (options.overwrite) {
        // Remove original file
        await rm(inputPath);
        // Move cropped file to original location
        await move(croppedPath, inputPath);
        return inputPath;
    }

    return croppedPath;
}
