import { Experimental } from "@srhenry/type-utils";

export type StepFn<TInput, TOutput> = Experimental.types.AsyncFunc<
    [input: TInput],
    TOutput
>;
