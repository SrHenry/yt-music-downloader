import { findSubArrayIndex } from "@/shared/functions/findSubArrayIndex.ts";

export function removeSubArray(array: string[], sub: string[]): string[] {
    const subArrayIndex = findSubArrayIndex(array, sub);

    if (subArrayIndex !== -1 && sub.length !== 0)
        return array.slice(0, subArrayIndex);

    return array;
}
