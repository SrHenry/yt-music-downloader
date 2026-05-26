import type {
    MetadataValidationError,
} from "@/workflow/pipelines/download/music/pipeline/steps/fetchPlaylistContentList/types/index.ts";
import type { YouTubePlaylistMetadata } from "@/workflow/pipelines/download/music/types/YouTubePlaylistMetadata.ts";

import { YouTubePlaylistMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubePlaylistMetadataSchema.ts";
import { parseValidationResult } from "@/shared/pipelines/parseValidationResult.ts";
import {
    type Result,
    ValidationErrors,
} from "@srhenry/type-utils";

const parseResult = parseValidationResult<YouTubePlaylistMetadata>();

export const validateMetadata = (
    metadata: unknown,
): Result<
    YouTubePlaylistMetadata,
    ValidationErrors<MetadataValidationError>
> => {
    const result = YouTubePlaylistMetadataSchema()
        .validator(false)
        .validate(metadata);

    return parseResult(result);
};
