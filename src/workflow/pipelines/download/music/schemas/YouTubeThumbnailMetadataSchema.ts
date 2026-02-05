import { number, object, string } from "@srhenry/type-utils";

export const YouTubeThumbnailMetadataSchema = () =>
    object<Thumbnail>({
        id: string(),
        url: string().url(),

        preference: number().optional(),
        width: number().optional(),
        height: number().optional(),
        resolution: string()
            .regex(/^\d+x\d+$/i)
            .optional(),
    });
