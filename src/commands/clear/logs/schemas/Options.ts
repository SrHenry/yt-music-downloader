import {
    createRule,
    Experimental,
    object,
    string,
    useCustomRules,
    type GetTypeGuard,
} from "@srhenry/type-utils";

export type OptionsSchema = GetTypeGuard<typeof OptionsSchema>;

const StringNumber = createRule({
    name: "Custom.StringNumber",
    message: "number",
    handler: (value: string) => () => !Number.isNaN(Number(value)),
});
const Integer = createRule({
    name: "Custom.StringNumber.Integer",
    message: "int",
    handler: (value: string) => () => Number.isInteger(Number(value)),
});

const Positive = createRule({
    name: "Custom.StringNumber.Positive",
    message: "positive",
    handler: (value: string) => () => Number(value) > 0,
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
