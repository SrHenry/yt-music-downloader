import {
    boolean,
    Experimental,
    object,
    type GetTypeGuard,
} from "@srhenry/type-utils";

export type OptionsSchema = GetTypeGuard<typeof OptionsSchema>;

const OptionsSchema = object({
    playlist: boolean(),
});

Experimental.Validator.setValidatorMessage(
    {
        playlist: "incorrect option value",
    },
    OptionsSchema
);

export const Options = () => OptionsSchema;
