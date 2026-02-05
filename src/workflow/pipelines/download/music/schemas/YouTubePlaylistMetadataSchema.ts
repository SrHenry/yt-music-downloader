import { YouTubeBaseMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubeBaseMetadataSchema.ts";
import { YouTubeThumbnailMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubeThumbnailMetadataSchema.ts";
import { and, array, number, object, string } from "@srhenry/type-utils";

const YouTubePlaylistEntryMetadataSchema = () =>
    and(
        YouTubeBaseMetadataSchema(),
        object({
            thumbnails: array({
                id: string().optional(),
                url: string().url(),

                preference: number().optional(),
                width: number().optional(),
                height: number().optional(),
                resolution: string()
                    .regex(/^\d+x\d+$/i)
                    .optional(),
            }),
        })
    );

export const YouTubePlaylistMetadataSchema = () =>
    and(
        YouTubeBaseMetadataSchema(),
        object({
            thumbnails: array(YouTubeThumbnailMetadataSchema()),
            entries: array(YouTubePlaylistEntryMetadataSchema()),
        })
    );
