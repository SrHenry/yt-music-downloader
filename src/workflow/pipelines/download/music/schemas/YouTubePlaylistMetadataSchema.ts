import { and, array, object } from "@srhenry/type-utils";
import { YouTubeBaseMetadataSchema } from "./YouTubeBaseMetadataSchema.ts";

export const YouTubePlaylistMetadataSchema = () =>
    and(
        YouTubeBaseMetadataSchema(),
        object({
            entries: array(YouTubeBaseMetadataSchema()),
        })
    );
