import { YouTubeBaseMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubeBaseMetadataSchema.ts";
import { YouTubeThumbnailMetadataSchema } from "@/workflow/pipelines/download/music/schemas/YouTubeThumbnailMetadataSchema.ts";
import {
    and,
    array,
    asNull,
    object,
    or,
    record,
    string,
} from "@srhenry/type-utils";

export const YouTubeMusicMetadataSchema = () =>
    and(
        YouTubeBaseMetadataSchema(),
        object({
            album: string(),
            formats: array(record()).optional(),
            thumbnails: array(YouTubeThumbnailMetadataSchema()),
            // yt-dlp own metadata
            _type: string().optional(),
            _version: object({
                version: string(),
                current_git_head: or(string(), asNull()),
                release_git_head: or(string(), asNull()),
                repository: string(),
            }).optional(),
        })
    );
