import { number, object, string } from "@srhenry/type-utils";

export const YouTubeThumbnailMetadataSchema = () =>
    // TODO: Removed explicit <Thumbnail> type param — ValidatorMap requires all keys including optional (see SrHenry/type-utils#41)
    object({
        id: string(),
        url: string().url(),

        preference: number().optional(),
        width: number().optional(),
        height: number().optional(),
        resolution: string()
            .regex(/^\d+x\d+$/i)
            .optional(),
    });
