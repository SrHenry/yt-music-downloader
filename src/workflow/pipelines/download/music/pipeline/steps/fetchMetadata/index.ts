import type {
    Initializer,
    Input,
    Output,
} from "@/workflow/pipelines/download/music/pipeline/steps/fetchMetadata/types/index.ts";
import type { StepFactory } from "@/workflow/pipelines/types/StepFactory.ts";

import { getMetadata } from "@/functions/getMetadata.ts";
import { info } from "@/log/index.ts";
import { ProcessError } from "@/shared/errors/ProcessError.ts";
import { logProcess } from "@/shared/pipelines/logProcess.ts";
import { logProcessError } from "@/shared/pipelines/logProcessError.ts";
import { YouTubeMusicMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubeMusicMetadataSchema.ts";
import type { YouTubeMusicMetadata } from "@/workflow/pipelines/download/music/types/YouTubeMusicMetadata.ts";
import { ValidationErrors } from "@srhenry/type-utils";

const { validate: validateMetadata } = YouTubeMusicMetadataSchema().validator();

const handleProcessError = logProcessError("ytDlp");

export const fetchMetadata: StepFactory<[Input, Output], Initializer> =
    () => async (source) => {
        try {
            info(
                "[progress] [fn:%s] Fetching metadata from %s",
                getMetadata.name,
                source,
            );

            // TODO: Remove cast once Infer<FluentSchema<T[], ...>> resolves correctly (see SrHenry/type-utils#39)
        const metadata = await getMetadata(source).then(validateMetadata) as YouTubeMusicMetadata;

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
            if (error instanceof ValidationErrors) {
                logProcess("workflow")(error);

                throw new TypeError(error.toString(), { cause: error });
            }
            if (error instanceof ProcessError) {
                handleProcessError(error);

                throw new Error(
                    `Failed to fetch metadata for source "${source}". See logs for more detail.`,
                );
            }

            throw error;
        }
    };
