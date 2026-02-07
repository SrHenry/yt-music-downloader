import type { Infer } from "@srhenry/type-utils";

import { createRule, object, string } from "@srhenry/type-utils";

export type OptionsSchema = Infer<typeof OptionsSchema>;

const StringNumber = createRule({
    name: "yt-music-downloader.String.StringNumber",
    message: "string must contain a number!",
    handler: (value: string) => () => !Number.isNaN(Number(value)),
});
const Integer = createRule({
    name: "yt-music-downloader.String.StringNumber.Integer",
    message: "string must contain an integer number!",
    handler: (value: string) => () => Number.isInteger(Number(value)),
});

const Positive = createRule({
    name: "yt-music-downloader.String.StringNumber.Positive",
    message: "stirng must contain a positive integer number!",
    handler: (value: string) => () => Number(value) > 0,
});

const Time = () => string().use(StringNumber()).use(Integer()).use(Positive());

const OptionsSchema = object({
    time: Time(),
});

export const Options = () => OptionsSchema;
