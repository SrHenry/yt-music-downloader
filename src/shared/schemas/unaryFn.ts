import type { Fn1 } from "@srhenry/type-utils";

import { asTypeGuard, createInlineRule, helpers, useSchema } from "@srhenry/type-utils";

export const unaryFn = <TParam = any, TReturn = any>() => {
    const baseGuard = asTypeGuard<Fn1<TParam, TReturn>>(
        (value) => helpers.isFunction(value),
        {
            kind: "unaryFunction",
        },
    );

    // TODO: Provide both type params as workaround — named overload unreachable with TSubject only (see SrHenry/type-utils#40)
    const hasParamLength = createInlineRule<Fn1<TParam, TReturn>, "hasParamLength">(
        "hasParamLength",
        (value) => value.length === 1,
    );

    return useSchema(baseGuard).use(hasParamLength);
};
