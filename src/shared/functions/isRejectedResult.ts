export const isRejectedResult = (
    result: PromiseSettledResult<any>
): result is PromiseRejectedResult => result.status === "rejected";
