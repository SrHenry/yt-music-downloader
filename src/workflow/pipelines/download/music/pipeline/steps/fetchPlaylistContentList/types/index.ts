import type { YouTubePlaylistMetadata } from "@/workflow/pipelines/download/music/types/YouTubePlaylistMetadata.ts";
import type { ValidationError, ValidationErrors } from "@srhenry/type-utils";

export type Input = string;

export type Output = {
    yt_src: string;
    metadata: YouTubePlaylistMetadata;
};

export type Initializer = [];

export type MetadataValidationError = ValidationError<
    unknown,
    YouTubePlaylistMetadata
>;
export type MetadataErrors = ValidationErrors<MetadataValidationError>;
