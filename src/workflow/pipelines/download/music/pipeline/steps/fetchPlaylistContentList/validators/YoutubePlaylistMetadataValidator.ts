import type { GetValidatorReturn } from "@/shared/types/GetValidatorReturn.ts";
import type {
    MetadataErrors,
    MetadataValidationError,
} from "@/workflow/pipelines/download/music/pipeline/steps/fetchPlaylistContentList/types/index.ts";
import type { YouTubePlaylistMetadata } from "@/workflow/pipelines/download/music/types/YouTubePlaylistMetadata.ts";

import { YouTubePlaylistMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubePlaylistMetadataSchema.ts";
import {
    type ErrorResult,
    type Result,
    type SucessfulResult,
    ValidationErrors,
    isInstanceOf,
    match,
} from "@srhenry/type-utils";

const parseResult = match<GetValidatorReturn<YouTubePlaylistMetadata>>()
    .with(
        isInstanceOf(ValidationErrors),
        (r) => [r, null] as ErrorResult<MetadataErrors>,
    )
    .default<SucessfulResult<YouTubePlaylistMetadata>>((r) => [null, r]).exec;

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
