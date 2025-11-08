import type { AsyncFn } from "@srhenry/type-utils";

export type StepFn<TInput, TOutput> = AsyncFn<[input: TInput], TOutput>;
