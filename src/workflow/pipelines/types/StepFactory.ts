import type { StepFn } from "@/workflow/pipelines/types/StepFn.ts";
import type { Factory } from "@srhenry/type-utils";

export type StepFactory<
    IO extends [any, any],
    Initializer extends [...any] = [],
> = IO extends [infer Input, infer Output]
    ? Factory<Initializer, StepFn<Input, Output>>
    : never;
