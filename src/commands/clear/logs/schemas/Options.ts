import {
    createRule,
    Experimental,
    object,
    string,
    useCustomRules,
} from "@srhenry/type-utils";

/**
 * @typedef {import("@srhenry/type-utils").GetTypeGuard<typeof OptionsSchema>} OptionsSchema
 */

const StringNumber = createRule({
    name: "Custom.StringNumber",
    message: "number",

    /** @param {string} value */
    handler: (value) => () => !Number.isNaN(Number(value)),
});
const Integer = createRule({
    name: "Custom.StringNumber.Integer",
    message: "int",

    /** @param {string} value */
    handler: (value) => () => Number.isInteger(Number(value)),
});

const Positive = createRule({
    name: "Custom.StringNumber.Positive",
    message: "positive",

    /** @param {string} value */
    handler: (value) => () => Number(value) > 0,
});

const Time = () =>
    useCustomRules(string(), StringNumber(), Integer(), Positive());

const OptionsSchema = object({
    time: Time(),
});

Experimental.Validator.setValidatorMessage(
    {
        time: "must be a positive integer!",
    },
    OptionsSchema
);

export const Options = () => OptionsSchema;
