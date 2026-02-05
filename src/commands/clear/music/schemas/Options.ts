import { createRule, object, string, type Infer } from "@srhenry/type-utils";

export type OptionsSchema = Infer<typeof OptionsSchema>;

const AllowedExtensionsStringListRule = createRule({
    name: "yt-music-downloader.String.AllowedExtensionsList",
    message: "must have a valid string list of extensions",
    handler: (value) => () =>
        /[a-zA-Z0-9]+([ ]*,[ ]*[a-zA-Z0-9]+)*/.test(value),
});

const NotEmptyString = () => string().nonEmpty();

const AllowedExtensionsStringList = () =>
    NotEmptyString().use(AllowedExtensionsStringListRule());

const OptionsSchema = object({
    allowedExtensions: AllowedExtensionsStringList(),
});

export const Options = () => OptionsSchema;
