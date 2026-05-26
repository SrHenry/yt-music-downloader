import type { Infer } from "@srhenry/type-utils";

import type { YouTubeMusicMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubeMusicMetadataSchema.ts";

type InferredMetadata = Infer<
    ReturnType<typeof YouTubeMusicMetadataSchema>
>;

// TODO: Remove Omit+override once Infer<FluentSchema<T[], ...>> resolves correctly (see SrHenry/type-utils#39)
export type YouTubeMusicMetadata = Omit<InferredMetadata, "thumbnails"> & {
    thumbnails: Thumbnail[];
};
