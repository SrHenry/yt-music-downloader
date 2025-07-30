/**
 * @template TWrapped
 * @param {import("@srhenry/type-utils").Experimental.Func0<any> | import("@srhenry/type-utils").Experimental.Func1<TWrapped, any>} fn
 *
 * @returns {(wrapped: TWrapped) => TWrapped}
 */
export function $do(fn) {
    return (wrapped) => {
        fn(wrapped);

        return wrapped;
    };
}
