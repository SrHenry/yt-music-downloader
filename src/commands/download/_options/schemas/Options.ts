import { boolean, object, string, type Infer } from "@srhenry/type-utils";

export type OptionsSchema = Infer<typeof OptionsSchema>;

const OptionsSchema = object({
    playlist: boolean(),
    thumbnail: boolean(),
    processing: boolean(),
    defaultArgs: boolean(),
    outputDir: string().optional(),
    thumbnailsDir: string().optional(),
});

export const Options = () => OptionsSchema;
