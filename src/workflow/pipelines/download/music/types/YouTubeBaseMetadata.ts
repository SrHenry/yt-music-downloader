import { GetTypeGuard } from "@srhenry/type-utils";

import { YouTubeBaseMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubeBaseMetadataSchema.ts";

export type YouTubeBaseMetadata = GetTypeGuard<
    ReturnType<typeof YouTubeBaseMetadataSchema>
>;
