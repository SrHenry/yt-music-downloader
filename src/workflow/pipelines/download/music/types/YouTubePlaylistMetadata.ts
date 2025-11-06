import { GetTypeGuard } from "@srhenry/type-utils";

import { YouTubePlaylistMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubePlaylistMetadataSchema.ts";

export type YouTubePlaylistMetadata = GetTypeGuard<
    ReturnType<typeof YouTubePlaylistMetadataSchema>
>;
