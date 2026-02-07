import { createInlineRule, object } from "@srhenry/type-utils";

const isIterable = object().use(
    createInlineRule(
        "hasIterableSymbolPropertyKey",
        (value: Record<number | symbol, any>) =>
            typeof value?.[Symbol.iterator] === "function",
    ),
);

const isLengthAwareIterable = isIterable.use(
    createInlineRule(
        "hasLengthProperty",
        (value) => typeof value?.length === "number",
    ),
) as unknown as <T = any>(value: unknown) => value is LengthAwareIterable<T>;

export const LengthAwareIterable = <T = any>() => isLengthAwareIterable<T>;
