import { YouTubeBaseMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubeBaseMetadataSchema.ts";
import { and, array, object } from "@srhenry/type-utils";

export const YouTubePlaylistMetadataSchema = () =>
    and(
        YouTubeBaseMetadataSchema(),
        object({
            entries: array(YouTubeBaseMetadataSchema()),
        }),
    );
