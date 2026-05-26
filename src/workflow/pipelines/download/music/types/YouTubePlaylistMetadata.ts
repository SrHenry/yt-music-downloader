import type { Infer } from "@srhenry/type-utils";

import type { YouTubePlaylistMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubePlaylistMetadataSchema.ts";

type InferredPlaylistMetadata = Infer<
    ReturnType<typeof YouTubePlaylistMetadataSchema>
>;

// TODO: Remove Omit+override once Infer<FluentSchema<T[], ...>> resolves correctly (see SrHenry/type-utils#39)
type BasePlaylistEntry = {
    id: string
    title: string | null
    description: string | null
    thumbnails: Thumbnail[]
}

export type YouTubePlaylistMetadata = Omit<
    InferredPlaylistMetadata,
    "thumbnails" | "entries"
> & {
    thumbnails: Thumbnail[];
    entries: BasePlaylistEntry[];
};
