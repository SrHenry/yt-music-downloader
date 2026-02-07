import type { AsyncFn, AsyncFn1, Fn } from "@srhenry/type-utils";

import { func } from "@/shared/schemas/func.ts";
import { LengthAwareAsyncIterable } from "@/shared/schemas/LengthAwareAsyncIterable.ts";
import { LengthAwareIterable } from "@/shared/schemas/LengthAwareIterable.ts";
import { helpers, match, or, tuple } from "@srhenry/type-utils";

const is_fn = tuple(func<[item: unknown], Promise<unknown>>(1));
const is_selector_fn = tuple(
    func<
        [from: unknown],
        | MaybeLengthAwareIterable<unknown>
        | MaybeLengthAwareAsyncIterable<unknown>
    >(1),
    func<
        [item: unknown, from: unknown, index: number, total: number | null],
        Promise<unknown>
    >(1, 2, 3, 4),
);

const getParamsResolver = match()
    .with(
        is_fn,
        ([fn]) =>
            async (list: Iterable<unknown> | AsyncIterable<unknown>) => {
                for await (const e of list) await fn(e);
            },
    )
    .with(is_selector_fn, ([selector, fn]) => async (value: unknown) => {
        const list = selector(value);
        let i = 0;
        for await (const e of list)
            await fn(
                e,
                value,
                i++,
                match(list)
                    .with(
                        or(
                            LengthAwareIterable<unknown>(),
                            LengthAwareAsyncIterable<unknown>(),
                        ),
                        (l) => l.length,
                    )

                    .default(null)
                    .exec(),
            );
    });

export function forEachAsync<T>(
    fn: AsyncFn<[item: T], unknown>,
): AsyncFn1<Iterable<T> | AsyncIterable<T>, void>;
export function forEachAsync<T, U>(
    selector: Fn<[from: T], Iterable<U> | AsyncIterable<U>>,
    fn: AsyncFn<
        [item: U, from: T, index: number, total: number | null],
        unknown
    >,
): AsyncFn1<T, void>;

export function forEachAsync(...args: unknown[]) {
    return getParamsResolver
        .default(() => helpers.$throw(new Error("Invalid arguments!")))
        .exec(args)!;
}
