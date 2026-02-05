import type { Fn1 } from "@srhenry/type-utils";

import { asTypeGuard, helpers } from "@srhenry/type-utils";

export const unaryFn = <TParam = any, TReturn = any>() =>
    asTypeGuard<Fn1<TParam, TReturn>>(
        (value) => helpers.isFunction(value) && value.length === 1,
        {
            kind: "unaryFunction",
        },
    );
