import type { YouTubePlaylistMetadata } from "@/workflow/pipelines/download/music/types/YouTubePlaylistMetadata.ts";

export type Input = string;

export type Output = {
    yt_src: string;
    metadata: YouTubePlaylistMetadata;
};

export type Initializer = [];
