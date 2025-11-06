import type {
    AsyncFn,
    AsyncFn1,
    Fn,
    TupleTools,
    TypeGuard,
} from "@srhenry/type-utils";

import { asTypeGuard, Experimental, helpers, tuple } from "@srhenry/type-utils";

const isUnaryFunction = asTypeGuard<Experimental.types.Func1<any, any>>(
    (value) => helpers.isFunction(value) && value.length === 1
);

const unaryFn = () => isUnaryFunction;
// const func = <T extends number>(params: T,) =>
//     asTypeGuard<Fn<TupleTools.CreateTuple<T>, any>>(
//         (value) => helpers.isFunction(value) && value.length === params
//     );

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

export function forEachAsync<T>(fn: AsyncFn1<T, unknown>): AsyncFn1<T[], void>;
export function forEachAsync<T, U>(
    selector: Fn<[from: T], U[]>,
    fn: AsyncFn<
        [item: U, from: T, index: number, total: number | null],
        unknown
    >
): AsyncFn1<T, void>;
// export function forEachAsync<T, U>(
//     selector: Fn1<T, U[]>,
//     fn: AsyncFn2<U, T, unknown>
// ): AsyncFn1<T, void>;

export function forEachAsync(...args: unknown[]) {
    return $switch()
        .case(is_fn, ([fn]) => async (list: unknown[]) => {
            for await (const e of list) await fn(e);
        })
        .case(is_selector_fn, ([selector, fn]) => async (value: unknown) => {
            let i = 0;
            for await (const e of selector(value))
                await fn(e, value, i++, selector(value)?.length ?? null);
        })
        .default((..._: any) => Promise.reject(new Error("Invalid arguments!")))
        .invoke(args);
}
