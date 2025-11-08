import type { GetTypeGuard } from "@srhenry/type-utils";

import type { YouTubeBaseMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubeBaseMetadataSchema.ts";

export type YouTubeBaseMetadata = GetTypeGuard<
    ReturnType<typeof YouTubeBaseMetadataSchema>
>;
