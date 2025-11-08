import type { AsyncFn0, AsyncFn1, Fn0, Fn1 } from "@srhenry/type-utils";

export function $do<TWrapped>(
    fn: Fn0<unknown> | Fn1<TWrapped, unknown>
): (wrapped: TWrapped) => TWrapped {
    return (wrapped) => {
        fn(wrapped);

        return wrapped;
    };
}

export function $doAsync<TWrapped>(
    fn: AsyncFn0<unknown> | AsyncFn1<TWrapped, unknown>
): (wrapped: TWrapped) => Promise<TWrapped> {
    return async (wrapped) => {
        await fn(wrapped);

        return wrapped;
    };
}
