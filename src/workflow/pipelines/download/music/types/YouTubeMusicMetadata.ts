import type { Infer } from "@srhenry/type-utils";

import type { YouTubeMusicMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubeMusicMetadataSchema.ts";

export type YouTubeMusicMetadata = Infer<
    ReturnType<typeof YouTubeMusicMetadataSchema>
>;
