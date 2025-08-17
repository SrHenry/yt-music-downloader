export const isFulfilledResult = <T>(
    result: PromiseSettledResult<T>
): result is PromiseFulfilledResult<T> => result.status === "fulfilled";
