import { Experimental } from "@srhenry/type-utils";

import { getMetadata } from "@/functions/getMetadata.ts";
import { error } from "@/log/index.ts";
import {
    Initializer,
    Input,
    Output,
} from "@/workflow/pipelines/download/music/pipeline/steps/fetchPlaylistContentList/types/index.ts";
import { StepFactory } from "@/workflow/pipelines/types/StepFactory.ts";
import { YouTubePlaylistMetadataSchema } from "../../../schemas/YouTubePlaylistMetadataSchema.ts";
import { YouTubePlaylistMetadata } from "../../../types/YouTubePlaylistMetadata.ts";

type MetadataValidationError = Experimental.ValidationError<
    unknown,
    YouTubePlaylistMetadata
>;

const validateMetadata = (
    metadata: unknown
): Experimental.Result<
    YouTubePlaylistMetadata,
    Experimental.ValidationErrors<MetadataValidationError[]>
> => {
    const result = Experimental.validate(
        metadata,
        YouTubePlaylistMetadataSchema(),
        false
    );

    return result instanceof Experimental.ValidationErrors
        ? [
              <Experimental.ValidationErrors<MetadataValidationError[]>>result,
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
