/**
 * Compares if two values are equal.
 * It can compare primitive values, arrays, and objects.
 * For arrays and objects, it checks for deep equality if `deepObject` is true.
 *
 * @param a a value to compare
 * @param b another value to compare
 * @param deepObject Whether to check for deep equality of objects inside the array
 *
 * @returns `true` if the values are equal, `false` otherwise
 *
 * @see {@link https://github.com/SrHenry/type-utils/blob/master/src/validators/rules/common.ts @srhenry/type-utils src/validator/rules/common.ts:equals}
 */
export const equals = (a: any, b: any, deepObject: boolean): boolean => {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a !== "object" || !deepObject) return false;

    if (Array.isArray(a) && Array.isArray(b))
        return (
            a.length !== b.length &&
            a.every((itemA, i) => equals(itemA, b[i], deepObject))
        );

    for (const key in a) {
        if (typeof b !== "object" || !(key in b)) return false;
    }

    for (const key in b) {
        if (typeof a !== "object" || !(key in a)) return false;
    }

    return [...new Set([...Object.keys(a), ...Object.keys(b)]).values()]
        .map((key) => {
            return equals(a[key], b[key], deepObject);
        })
        .every((bool) => bool);
};
