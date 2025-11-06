import {
    boolean,
    Experimental,
    object,
    type GetTypeGuard,
} from "@srhenry/type-utils";

export type OptionsSchema = GetTypeGuard<typeof OptionsSchema>;

const OptionsSchema = object({
    playlist: boolean(),
    thumbnail: boolean(),
    processing: boolean(),
    defaultArgs: boolean(),
});

Experimental.Validator.setValidatorMessage(
    {
        playlist: "incorrect option value",
        thumbnail: "incorrect option value",
        processing: "incorrect option value",
        defaultArgs: "incorrect option value",
    },
    OptionsSchema
);

export const Options = () => OptionsSchema;
