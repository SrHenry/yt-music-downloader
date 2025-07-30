import { cast } from "../../../shared/functions/cast.ts";

/**
 * @typedef {() => void} NoArgsNoOptionsCommandAction
 * @typedef {(options: import('commander').OptionValues) => void} NoArgsCommandAction
 */

/**
 * @template {any[]} [Args = [argument: any]]
 * @typedef {(...args: Args) => void} NoOptionsCommandAction
 */

/**
 * @template {any[]} [Args = [argument: any]]
 * @typedef {(...args: [...Args, import("commander").OptionValues]) => void} BaseCommandAction
 */

/**
 * @template {any[]} [Args = any[]]
 * @typedef {Args extends never ? (NoArgsNoOptionsCommandAction | NoArgsCommandAction ) : (NoArgsNoOptionsCommandAction | NoArgsCommandAction | NoOptionsCommandAction<Args> | BaseCommandAction<Args>) } CommandAction
 */

/**
 * @template T
 * @typedef {T extends Promise<any> ? never : T} NoPromise
 */

/**
 * @template {(...args: any[]) => any} Fn
 * @typedef {Fn extends (...args: any[]) => infer ReturnType ? ReturnType extends NoPromise<ReturnType> ? Fn : never : never} AsSyncFn
 */

/**
 * @template {(...args: any[]) => any} Fn
 * @typedef {Fn extends AsSyncFn<Fn> ? Fn extends CommandAction<any[]> ? Fn : never : never} AsCommandAction
 */

/**
 * @template {CommandAction} Action
 * @param {AsCommandAction<Action>} action */
export const useAction = (action) => cast(action);
