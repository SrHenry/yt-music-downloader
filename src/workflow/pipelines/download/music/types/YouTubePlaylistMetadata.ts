import type { Infer } from "@srhenry/type-utils";

import type { YouTubePlaylistMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubePlaylistMetadataSchema.ts";

export type YouTubePlaylistMetadata = Infer<
    ReturnType<typeof YouTubePlaylistMetadataSchema>
>;
