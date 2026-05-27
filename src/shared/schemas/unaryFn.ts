import type { Fn1 } from "@srhenry/type-utils";

import { asTypeGuard, createInlineRule, helpers, useSchema } from "@srhenry/type-utils";

export const unaryFn = <TParam = any, TReturn = any>() => {
    const baseGuard = asTypeGuard<Fn1<TParam, TReturn>>(
        (value) => helpers.isFunction(value),
        {
            kind: "unaryFunction",
        },
    );

	const hasParamLength = createInlineRule<Fn1<TParam, TReturn>>(
        "hasParamLength",
        (value) => value.length === 1,
    );

    return useSchema(baseGuard).use(hasParamLength);
};
