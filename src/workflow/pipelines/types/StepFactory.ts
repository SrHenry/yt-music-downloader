import type { StepFn } from "@/workflow/pipelines/types/StepFn.ts";
import type { Experimental } from "@srhenry/type-utils";

export type StepFactory<
    IO extends [any, any],
    Initializer extends [...any] = []
> = IO extends [infer Input, infer Output]
    ? Experimental.types.Factory<Initializer, StepFn<Input, Output>>
    : never;
