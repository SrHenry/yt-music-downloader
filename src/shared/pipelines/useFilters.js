/**
 * @template T
 * @typedef {((value: T, index: number, array: T[]) => boolean) | (<S extends T> (value: T, index: number, array: T[]) => value is S)} Predicate<T>
 */

/** @type {<T>(filters: Predicate<T>[]) => (list:T[]) => T[]}} */
export const useFilters = (filters) => (list) =>
    filters.reduce((_, fn) => _.filter(fn), list);
