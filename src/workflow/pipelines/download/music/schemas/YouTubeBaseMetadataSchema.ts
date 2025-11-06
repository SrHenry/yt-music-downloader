import { asNull, object, or, string } from "@srhenry/type-utils";

export const YouTubeBaseMetadataSchema = () =>
    object({
        id: string(),
        title: or(string(), asNull()),
        description: or(string(), asNull()),
    });
