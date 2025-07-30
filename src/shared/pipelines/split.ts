/** @type {(separator?: string | RegExp) => (list: string) => string[]} */
export const split =
    (separator = ",") =>
    (str) =>
        str.split(separator);
