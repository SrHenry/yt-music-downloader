import type { Fn, TupleTools, TypeGuard } from "@srhenry/type-utils";
import { asTypeGuard, createInlineRule, helpers, useSchema } from "@srhenry/type-utils";

type MapFuncGuards<TParams extends [...number[]]> = TParams extends [
    infer T extends number,
    ...infer Rest extends number[],
]
    ? TypeGuard<Fn<TupleTools.CreateTuple<T>, any>> | MapFuncGuards<Rest>
    : never;

export function func<T extends number>(
    params: T,
): TypeGuard<Fn<TupleTools.CreateTuple<T>, any>>;
export function func<T extends [...number[]]>(...params: T): MapFuncGuards<T>;

export function func<TParams extends [...any[]] = [], TReturn = any>(
    argsLength: TParams["length"],
): TypeGuard<Fn<TParams, TReturn>>;
export function func<TParams extends [...any[]] = [], TReturn = any>(
    ...params: number[]
): TypeGuard<Fn<TParams, any>>;

export function func(...params: number[]) {
    const baseGuard = asTypeGuard<Fn<any[], any>>(
        (value) => helpers.isFunction(value),
        {
            kind: "function",
        },
    );

    // TODO: Provide both type params as workaround — named overload unreachable with TSubject only (see SrHenry/type-utils#40)
    const hasParamLength = createInlineRule<Fn<any[], any>, "hasParamLength">(
        "hasParamLength",
        (value) => params.some((p) => p === value.length),
    );

    return useSchema(baseGuard).use(hasParamLength);
}
