import type { Fn, Fn1, TupleTools, TypeGuard } from "@srhenry/type-utils";

import { asTypeGuard, Experimental, helpers, tuple } from "@srhenry/type-utils";

const isUnaryFunction = asTypeGuard<Experimental.types.Func1<any, any>>(
    (value) => helpers.isFunction(value) && value.length === 1
);

const unaryFn = () => isUnaryFunction;

type MapFuncGuards<TParams extends [...number[]]> = TParams extends [
    infer T extends number,
    ...infer Rest extends number[]
]
    ? TypeGuard<Fn<TupleTools.CreateTuple<T>, any>> | MapFuncGuards<Rest>
    : never;

function func<T extends number>(
    params: T
): TypeGuard<Fn<TupleTools.CreateTuple<T>, any>>;
function func<T extends [...number[]]>(...params: T): MapFuncGuards<T>;

function func(...params: number[]) {
    return asTypeGuard<Fn<any[], any>>(
        (value) =>
            helpers.isFunction(value) && params.some((p) => p === value.length)
    );
}

const is_fn = tuple(unaryFn());
const is_selector_fn = tuple(unaryFn(), func(1, 2, 3, 4));

const { $switch } = Experimental;

export function forEach<T>(fn: Fn<[item: T], unknown>): Fn1<Iterable<T>, void>;
export function forEach<T, U>(
    selector: Fn<[from: T], Iterable<U>>,
    fn: Fn<[item: U, from: T, index: number, total: number | null], unknown>
): Fn1<T, void>;

export function forEach(...args: unknown[]) {
    return $switch()
        .case(is_fn, ([fn]) => (list: Iterable<unknown>) => {
            for (const e of list) fn(e);
        })

        .case(is_selector_fn, ([selector, fn]) => (value: unknown) => {
            let i = 0;
            for (const e of selector(value))
                fn(e, value, i++, selector(value)?.length ?? null);
        })
        .default(() => {
            throw new Error("Invalid arguments!");
        })
        .invoke(args);
}
