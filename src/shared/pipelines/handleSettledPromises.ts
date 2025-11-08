import { Experimental } from "@srhenry/type-utils";

import { pass } from "@/shared/functions/pass.ts";

export type OnFulfilledCallback<T, TResult> = (
    value: T
) => TResult | PromiseLike<TResult>;

export type OnRejectedCallback<TResult> = (
    reason: any
) => TResult | PromiseLike<TResult>;

type processResultsFn<T, TFulfulledResult, TRejectedResult> =
    Experimental.types.AsLambda<
        (
            results: PromiseSettledResult<T>[]
        ) => [
            sucessHandledResults: TFulfulledResult[],
            rejectHandledResults: TRejectedResult[]
        ]
    >;

export function handleSettledPromises<
    T,
    TFulfulledResult,
    TRejectedResult
>(): processResultsFn<T, TFulfulledResult, TRejectedResult>;

export function handleSettledPromises<T, TFulfulledResult, TRejectedResult>(
    onfulfilled: OnFulfilledCallback<T, TFulfulledResult>,
    onrejected: OnRejectedCallback<TRejectedResult>
): processResultsFn<T, TFulfulledResult, TRejectedResult>;

export function handleSettledPromises<T, TFulfulledResult, TRejectedResult>(
    onfulfilled:
        | OnFulfilledCallback<T, TFulfulledResult>
        | undefined
        | null = pass as OnFulfilledCallback<T, TFulfulledResult>,
    onrejected:
        | OnRejectedCallback<TRejectedResult>
        | undefined
        | null = pass as OnRejectedCallback<TRejectedResult>
) {
    return Experimental.lambda((results: PromiseSettledResult<T>[]) => {
        const onSucessResults: TFulfulledResult[] = [];
        const onRejectedResults: TRejectedResult[] = [];

        for (const result of results) {
            if (result.status === "fulfilled")
                onSucessResults.push(
                    (onfulfilled ?? pass)(
                        result.value
                    ) as unknown as TFulfulledResult
                );
            else
                onRejectedResults.push(
                    (onrejected ?? pass)(
                        result.reason
                    ) as unknown as TRejectedResult
                );
        }

        return [onSucessResults, onRejectedResults] as const;
    });
}
