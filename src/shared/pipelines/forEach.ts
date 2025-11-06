import {
    asTypeGuard,
    Experimental,
    GetTypeGuard,
    helpers,
    tuple,
} from "@srhenry/type-utils";

const isUnaryFunction = asTypeGuard<Experimental.types.Func1<any, any>>(
    (value) => helpers.isFunction(value) && value.length === 1
);

const unaryFn = () => isUnaryFunction;
const func =
    <T extends number>(params: T) =>
    (
        value: unknown
    ): value is Experimental.types.Func<
        Experimental.types.TupleTools.CreateTuple<T>,
        any
    > =>
        helpers.isFunction(value) && value.length === params;

const is_fn = tuple([unaryFn()]);
const is_selector_fn = tuple([unaryFn(), func(2)]);

type Params1 = GetTypeGuard<typeof is_fn>;
type Params2 = GetTypeGuard<typeof is_selector_fn>;

const { $switch } = Experimental;

export function forEach<T>(
    fn: Experimental.types.Func1<T, unknown>
): Experimental.types.Func1<T[], void>;
export function forEach<T, U>(
    selector: Experimental.types.Func1<T, U[]>,
    fn: Experimental.types.Func2<U, T, unknown>
): Experimental.types.Func1<T, void>;

export function forEach(...args: unknown[]) {
    return $switch(args)
        .case(
            is_fn,
            ([fn]: Params1) =>
                (list: unknown[]) =>
                    list.forEach(fn)
        )

        .case(
            is_selector_fn,
            ([selector, fn]: Params2) =>
                (value: unknown) =>
                    selector(value).forEach((e: unknown) => fn(e, value))
        )
        .default(() => {
            throw new Error("Invalid arguments!");
        })
        .invoke();
}
