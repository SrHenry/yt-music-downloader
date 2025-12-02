import {
    createRule,
    Experimental,
    object,
    string,
    type Infer,
} from "@srhenry/type-utils";

export type OptionsSchema = Infer<typeof OptionsSchema>;

const AllowedExtensionsStringListRule = createRule({
    name: "yt-music-downloader.String.AllowedExtensionsList",
    message: "extensions list",
    handler: (value) => () =>
        /[a-zA-Z0-9]+([ ]*,[ ]*[a-zA-Z0-9]+)*/.test(value),
});

const NotEmptyString = () => string().nonEmpty();

const AllowedExtensionsStringList = () =>
    NotEmptyString().use(AllowedExtensionsStringListRule());

const OptionsSchema = object({
    allowedExtensions: AllowedExtensionsStringList(),
});

Experimental.Validator.setValidatorMessage(
    {
        allowedExtensions: "must have a valid string list of extensions",
    },
    OptionsSchema
);

export const Options = () => OptionsSchema;
