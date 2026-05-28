import type { GetValidatorReturn } from "@/shared/types/GetValidatorReturn.ts";

import {
    type ErrorResult,
    type SucessfulResult,
    type ValidationError,
    ValidationErrors,
    isInstanceOf,
    match,
} from "@srhenry/type-utils";

export function parseValidationResult<T, E extends ValidationError<any, any> = ValidationError<unknown, T>>() {
    return match<GetValidatorReturn<T>>()
        .with(
            isInstanceOf(ValidationErrors),
            (r) => [r, null] as ErrorResult<ValidationErrors<E>>,
        )
        .default<SucessfulResult<T>>((r) => [null, r]).exec;
}
