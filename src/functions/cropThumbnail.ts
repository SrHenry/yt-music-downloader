import { rename as move, rm } from "node:fs/promises";
import { basename, resolve } from "node:path";

import { DEFAULT_CROP_OPTIONS, ROOT_PATH } from "@/constants.ts";
import { fileExists } from "@/shared/functions/fileExists.ts";
import type { CropOptions } from "@/types/crop.ts";
import { cropToSquare } from "./cropToSquare.ts";

/**
 * Crops an image to a 1:1 (square) aspect ratio and optionally overwrites the original file.
 *
 * @param inputPath Path to the input image file
 * @param options Optional cropping configuration
 * @returns Path to the output (cropped) image file
 */
export async function cropThumbnail(
    inputPath: string,
    options: CropOptions = DEFAULT_CROP_OPTIONS,
): Promise<string> {
    const tempDirectory = resolve(ROOT_PATH, "out/crop");
    const croppedPath = resolve(
        tempDirectory,
        `cropped-${basename(inputPath)}`,
    );

    await cropToSquare(inputPath);

    if (!(await fileExists(croppedPath))) {
        throw new Error(
            `Failed to crop thumbnail! Cropped file was not created.`,
        );
    }

    if (options.overwrite) {
        await rm(inputPath);
        await move(croppedPath, inputPath);

        return inputPath;
    }

    return croppedPath;
}
