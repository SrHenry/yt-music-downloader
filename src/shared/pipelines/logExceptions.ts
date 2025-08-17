import { error } from "../../log/index.ts";

function logExceptionsFn<T>(
    formatter: any,
    results: PromiseSettledResult<T>[]
) {
    return results
        .filter((r) => r.status === "rejected")
        .forEach(({ reason }) => error(formatter, reason));
}

export const logExceptions =
    <T = unknown>(formatter: any) =>
    (results: PromiseSettledResult<T>[]) =>
        logExceptionsFn<T>(formatter, results);
