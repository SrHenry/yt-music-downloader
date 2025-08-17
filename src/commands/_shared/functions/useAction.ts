import { cast } from "../../../shared/functions/cast.js";

type NoArgsNoOptionsCommandAction = () => void;

type NoArgsCommandAction = (options: import("commander").OptionValues) => void;

type NoOptionsCommandAction<Args extends any[] = [argument: any]> = (
    ...args: Args
) => void;

type BaseCommandAction<Args extends any[] = [argument: any]> = (
    ...args: [...Args, import("commander").OptionValues]
) => void;

type CommandAction<Args extends any[] = any[]> = Args extends never
    ? NoArgsNoOptionsCommandAction | NoArgsCommandAction
    :
          | NoArgsNoOptionsCommandAction
          | NoArgsCommandAction
          | NoOptionsCommandAction<Args>
          | BaseCommandAction<Args>;

type NoPromise<T> = T extends Promise<any> ? never : T;

type AsSyncFn<Fn extends (...args: any[]) => any> = Fn extends (
    ...args: any[]
) => infer ReturnType
    ? ReturnType extends NoPromise<ReturnType>
        ? Fn
        : never
    : never;

type AsCommandAction<Fn extends (...args: any[]) => any> =
    Fn extends AsSyncFn<Fn>
        ? Fn extends CommandAction<any[]>
            ? Fn
            : never
        : never;
export const useAction = <Action extends CommandAction>(
    action: AsCommandAction<Action>
) => cast(action);
