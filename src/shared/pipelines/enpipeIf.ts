import type { Fn1, Predicate } from "@srhenry/type-utils";
import noop from "./noop.ts";

export function enpipeIf<TChained, TNewChained>(
    condition: boolean,
    fn: Fn1<TChained, TNewChained>
): Fn1<TChained, TChained | TNewChained>;
export function enpipeIf<TChained, TNewChained>(
    predicate: Predicate<TChained>,
    fn: Fn1<TChained, TNewChained>
): Fn1<TChained, TChained | TNewChained>;

export function enpipeIf<TChained, TNewChained, TNewChainedElse>(
    condition: boolean,
    fn: Fn1<TChained, TNewChained>,
    fnElse: Fn1<TChained, TNewChainedElse>
): Fn1<TChained, TNewChained | TNewChainedElse>;
export function enpipeIf<TChained, TNewChained, TNewChainedElse>(
    predicate: Predicate<TChained>,
    fn: Fn1<TChained, TNewChained>,
    fnElse: Fn1<TChained, TNewChainedElse>
): Fn1<TChained, TNewChained | TNewChainedElse>;

export function enpipeIf(
    condition: boolean | Predicate<unknown>,
    fn: Fn1<any, any>,
    fnElse?: Fn1<any, any>
): Fn1<any, any> {
    if (typeof condition === "boolean") {
        return condition ? fn : fnElse ?? noop();
    }

    return (value) =>
        condition(value) ? fn(value) : (fnElse ?? noop())(value);
}
