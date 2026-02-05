import type { YouTubeMusicMetadata } from "@/workflow/pipelines/download/music/types/YouTubeMusicMetadata.ts";

export type Input = string;
export type Output = {
    yt_src: string;
    metadata: YouTubeMusicMetadata;
};
export type Initializer = [];
