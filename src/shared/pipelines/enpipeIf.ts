import { Experimental } from "@srhenry/type-utils";
import noop from "./noop.ts";

export function enpipeIf<TChained, TNewChained>(
    condition: boolean,
    fn: Experimental.types.Func1<TChained, TNewChained>
): Experimental.types.Func1<TChained, TChained | TNewChained>;
export function enpipeIf<TChained, TNewChained>(
    predicate: Experimental.types.Predicate<TChained>,
    fn: Experimental.types.Func1<TChained, TNewChained>
): Experimental.types.Func1<TChained, TChained | TNewChained>;

export function enpipeIf<TChained, TNewChained, TNewChainedElse>(
    condition: boolean,
    fn: Experimental.types.Func1<TChained, TNewChained>,
    fnElse: Experimental.types.Func1<TChained, TNewChainedElse>
): Experimental.types.Func1<TChained, TNewChained | TNewChainedElse>;
export function enpipeIf<TChained, TNewChained, TNewChainedElse>(
    predicate: Experimental.types.Predicate<TChained>,
    fn: Experimental.types.Func1<TChained, TNewChained>,
    fnElse: Experimental.types.Func1<TChained, TNewChainedElse>
): Experimental.types.Func1<TChained, TNewChained | TNewChainedElse>;

export function enpipeIf(
    condition: boolean | Experimental.types.Predicate<unknown>,
    fn: Experimental.types.Func1<any, any>,
    fnElse?: Experimental.types.Func1<any, any>
): Experimental.types.Func1<any, any> {
    if (typeof condition === "boolean") {
        return condition ? fn : fnElse ?? noop();
    }

    return (value) =>
        condition(value) ? fn(value) : (fnElse ?? noop())(value);
}
