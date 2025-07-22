import {
    createRule,
    Experimental,
    object,
    string,
    StringRules,
    useCustomRules,
} from "@srhenry/type-utils";

/**
 * @typedef {import("@srhenry/type-utils").GetTypeGuard<typeof OptionsSchema>} OptionsSchema
 */

const AllowedExtensionsStringListRule = createRule({
    name: "yt-music-downloader.String.AllowedExtensionsList",
    message: "extensions list",
    handler: (value) => () =>
        /[a-zA-Z0-9]+([ ]*,[ ]*[a-zA-Z0-9]+)*/.test(value),
});

const NotEmptyString = () => string([StringRules.nonEmpty()]);

const AllowedExtensionsStringList = () =>
    useCustomRules(NotEmptyString(), AllowedExtensionsStringListRule());

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
