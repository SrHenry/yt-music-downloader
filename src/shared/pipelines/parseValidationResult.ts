import type { GetValidatorReturn } from "@/shared/types/GetValidatorReturn.ts";

import {
    type ErrorResult,
    type SucessfulResult,
    ValidationErrors,
    isInstanceOf,
    match,
} from "@srhenry/type-utils";

export function parseValidationResult<T>() {
    return match<GetValidatorReturn<T>>()
        .with(
            isInstanceOf(ValidationErrors),
            (r) => [r, null] as ErrorResult<ValidationErrors<any>>,
        )
        .default<SucessfulResult<T>>((r) => [null, r]).exec;
}

export type ParseValidationResultFn<T> = ReturnType<typeof parseValidationResult<T>>;
