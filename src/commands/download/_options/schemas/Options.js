import { boolean, Experimental, object } from "@srhenry/type-utils";

/**
 * @typedef {import("@srhenry/type-utils").GetTypeGuard<typeof OptionsSchema>} OptionsSchema
 */

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
