import type { Experimental } from "@srhenry/type-utils";

export function $do<TWrapped>(
    fn: Experimental.Func0<unknown> | Experimental.Func1<TWrapped, unknown>
): (wrapped: TWrapped) => TWrapped {
    return (wrapped) => {
        fn(wrapped);

        return wrapped;
    };
}
