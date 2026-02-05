import type { Fn, Fn1 } from "@srhenry/type-utils";

import { func } from "@/shared/schemas/func.ts";
import { LengthAwareIterable } from "@/shared/schemas/LengthAwareIterable.ts";
import { helpers, match, tuple } from "@srhenry/type-utils";

const is_fn = tuple(func<[item: unknown], unknown>(1));
const is_selector_fn = tuple(
    func<[from: unknown], MaybeLengthAwareIterable<unknown>>(1),
    func<[item: unknown, from: unknown, index: number, total: number | null]>(
        1,
        2,
        3,
        4,
    ),
);

const getParamsResolver = match()
    .with(is_fn, ([fn]) => (list: Iterable<unknown>) => {
        for (const e of list) fn(e);
    })
    .with(is_selector_fn, ([selector, fn]) => (value: unknown) => {
        const list = selector(value);
        let i = 0;
        for (const e of list)
            fn(
                e,
                value,
                i++,
                match(list)
                    .with(LengthAwareIterable(), (l) => l.length)
                    .default(null)
                    .exec(),
            );
    });

export function forEach<T>(fn: Fn<[item: T], unknown>): Fn1<Iterable<T>, void>;
export function forEach<T, U>(
    selector: Fn<[from: T], Iterable<U>>,
    fn: Fn<[item: U, from: T, index: number, total: number | null], unknown>,
): Fn1<T, void>;

export function forEach(...args: unknown[]) {
    return getParamsResolver
        .default(() => helpers.$throw(new Error("Invalid arguments!")))
        .exec(args)!;
}
