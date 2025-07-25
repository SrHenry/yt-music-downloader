import { Experimental } from "@srhenry/type-utils";

import { pass } from "../functions/pass.js";

/**
 * @template T
 * @template TResult
 *
 * @typedef {(value: T) => TResult | PromiseLike<TResult>} OnFulfilledCallback
 */

/**
 * @template TResult
 *
 * @typedef {(reason: any) => TResult | PromiseLike<TResult>} OnRejectedCallback
 */

/**
 * @template T
 * @template TFulfulledResult
 * @template TRejectedResult
 *
 * @param {OnFulfilledCallback<T, TFulfulledResult> | undefined | null} onSucess
 * @param {OnRejectedCallback<TRejectedResult> | undefined | null} onReject
 */

export const handleSettledPromises = (onfulfilled = pass, onrejected = pass) =>
    Experimental.lambda(
        /**
         * @param {PromiseSettledResult<T>[]} results
         * @returns {[sucessHandledResults: TFulfulledResult[], rejectHandledResults: TRejectedResult[]]}
         */
        (results) => {
            const onSucessResults = [];
            const onRejectedResults = [];

            for (const result of results) {
                if (result.status === "fulfilled")
                    onSucessResults.push((onfulfilled ?? pass)(result.value));
                else
                    onRejectedResults.push((onrejected ?? pass)(result.reason));
            }

            return [onSucessResults, onRejectedResults];
        }
    );
