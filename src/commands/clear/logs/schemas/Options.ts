import {
    createRule,
    Experimental,
    object,
    string,
    type Infer,
} from "@srhenry/type-utils";

export type OptionsSchema = Infer<typeof OptionsSchema>;

const StringNumber = createRule({
    name: "yt-music-downloader.String.StringNumber",
    message: "number",
    handler: (value: string) => () => !Number.isNaN(Number(value)),
});
const Integer = createRule({
    name: "yt-music-downloader.String.StringNumber.Integer",
    message: "int",
    handler: (value: string) => () => Number.isInteger(Number(value)),
});

const Positive = createRule({
    name: "yt-music-downloader.String.StringNumber.Positive",
    message: "positive",
    handler: (value: string) => () => Number(value) > 0,
});

const Time = () => string().use(StringNumber()).use(Integer()).use(Positive());

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
