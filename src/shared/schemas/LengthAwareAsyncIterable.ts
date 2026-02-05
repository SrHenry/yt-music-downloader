import { createInlineRule, object } from "@srhenry/type-utils";

const isAsyncIterable = object().use(
    createInlineRule(
        "hasIterableSymbolPropertyKey",
        (value: Record<number | symbol, any>) =>
            typeof value?.[Symbol.iterator] === "function",
    ),
);

const isLengthAwareAsyncIterable = isAsyncIterable.use(
    createInlineRule(
        "hasLengthProperty",
        (value) => typeof value?.length === "number",
    ),
) as unknown as <T = any>(
    value: unknown,
) => value is LengthAwareAsyncIterable<T>;

export const LengthAwareAsyncIterable = <T = any>() =>
    isLengthAwareAsyncIterable<T>;
