import { Experimental, type Result } from "@srhenry/type-utils";

import type {
    Initializer,
    Input,
    Output,
} from "@/workflow/pipelines/download/music/pipeline/steps/fetchPlaylistContentList/types/index.ts";
import type { StepFactory } from "@/workflow/pipelines/types/StepFactory.ts";
import type { YouTubePlaylistMetadata } from "../../../types/YouTubePlaylistMetadata.ts";

import { getMetadata } from "@/functions/getMetadata.ts";
import { error } from "@/log/index.ts";
import { YouTubePlaylistMetadataSchema } from "../../../schemas/YouTubePlaylistMetadataSchema.ts";

type MetadataValidationError = Experimental.validators.ValidationError<
    unknown,
    YouTubePlaylistMetadata
>;

const validateMetadata = (
    metadata: unknown
): Result<
    YouTubePlaylistMetadata,
    Experimental.validators.ValidationErrors<MetadataValidationError[]>
> => {
    const result = Experimental.validate(
        metadata,
        YouTubePlaylistMetadataSchema(),
        false
    );

    return result instanceof Experimental.validators.ValidationErrors
        ? [
              result as Experimental.validators.ValidationErrors<
                  MetadataValidationError[]
              >,
              null,
          ]
        : [null, result];
};

export const fetchPlaylistContentList: StepFactory<
    [Input, Output],
    Initializer
> =
    () =>
    async ({ yt_src }) => {
        console.log("Fetching playlist content...");

        const metadata = await getMetadata(yt_src);

        const [err, validatedMetadata] = validateMetadata(metadata);

        if (err) {
            error(
                "YouTube source's metadata is not compliant with defined schema!\n %s",
                err.toString()
            );

            throw err;
        }

        console.log();
        console.log(`Title: ${validatedMetadata.title ?? "<empty>"}`);
        console.log();
        console.log(
            `Description: ${validatedMetadata.description ?? "<empty>"}`
        );

        return { yt_src, metadata: validatedMetadata };
    };
