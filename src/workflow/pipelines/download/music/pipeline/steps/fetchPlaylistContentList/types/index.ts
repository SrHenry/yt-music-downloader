import type { YouTubePlaylistMetadata } from "@/workflow/pipelines/download/music/types/YouTubePlaylistMetadata.ts";

import type { Output as PreviousOutput } from "@/workflow/pipelines/download/music/pipeline/steps/validateSource/types/index.ts";
import type { ValidationError, ValidationErrors } from "@srhenry/type-utils";
export type Input = PreviousOutput;

export type Output = Prettify<
    Input & {
        metadata: YouTubePlaylistMetadata;
    }
>;

export type Initializer = [];

export type MetadataValidationError = ValidationError<
    unknown,
    YouTubePlaylistMetadata
>;
export type MetadataErrors = ValidationErrors<MetadataValidationError>;
