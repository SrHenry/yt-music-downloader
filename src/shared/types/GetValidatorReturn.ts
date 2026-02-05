import type { useSchema } from "@srhenry/type-utils";
export type GetValidatorReturn<T> = ReturnType<
    ReturnType<ReturnType<typeof useSchema<T>>["validator"]>["validate"]
>;
