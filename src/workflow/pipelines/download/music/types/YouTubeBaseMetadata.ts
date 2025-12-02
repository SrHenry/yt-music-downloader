import type { Infer } from "@srhenry/type-utils";

import type { YouTubeBaseMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubeBaseMetadataSchema.ts";

export type YouTubeBaseMetadata = Infer<
    ReturnType<typeof YouTubeBaseMetadataSchema>
>;
