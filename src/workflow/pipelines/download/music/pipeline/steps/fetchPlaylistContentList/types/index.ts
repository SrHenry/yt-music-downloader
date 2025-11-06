import { Output as PreviousOutput } from "@/workflow/pipelines/download/music/pipeline/steps/validateSource/types/index.ts";
import { YouTubePlaylistMetadata } from "../../../../types/YouTubePlaylistMetadata.ts";
export type Input = PreviousOutput;

export type Output = Prettify<
    Input & {
        metadata: YouTubePlaylistMetadata;
    }
>;

export type Initializer = [];
