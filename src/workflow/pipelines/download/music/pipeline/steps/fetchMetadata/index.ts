import type {
    Initializer,
    Input,
    Output,
} from "@/workflow/pipelines/download/music/pipeline/steps/fetchMetadata/types/index.ts";
import type { StepFactory } from "@/workflow/pipelines/types/StepFactory.ts";

import { ROOT_PATH } from "@/constants.ts";
import { getMetadata } from "@/functions/getMetadata.ts";
import { info } from "@/log/index.ts";
import { ProcessError } from "@/shared/errors/ProcessError.ts";
import { YouTubeMusicMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubeMusicMetadataSchema.ts";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const { validate: validateMetadata } = YouTubeMusicMetadataSchema().validator();

const handleProcessError = (error: ProcessError) =>
    writeFile(
        resolve(
            ROOT_PATH,
            "logs/yt-dlp",
            new Date()
                .toISOString()
                .replace("T", "_")
                .replace(/:/g, "-")
                .concat(".log"),
        ),
        error.stderr ?? "",
    );

export const fetchMetadata: StepFactory<[Input, Output], Initializer> =
    () => async (source) => {
        try {
            info(
                "[progress] [fn:%s] Fetching metadata from %s",
                getMetadata.name,
                source,
            );

            const metadata = await getMetadata(source).then(validateMetadata);

            console.log(`Content ID: ${metadata.id}`);
            console.log();
            console.log(`Title: ${metadata.title ?? "<empty>"}`);
            console.log();
            console.log(`Album: ${metadata.album ?? "<empty>"}`);
            console.log();

            return {
                yt_src: metadata.id,
                metadata,
            };
        } catch (error) {
            if (error instanceof ProcessError) {
                handleProcessError(error);

                throw new Error(
                    `Failed to fetch metadata for source "${source}". See logs for more detail.`,
                );
            }

            throw error;
        }
    };
