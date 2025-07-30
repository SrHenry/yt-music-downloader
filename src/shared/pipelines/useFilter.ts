/**
 * @template T
 * @typedef {((value: T, index: number, array: T[]) => boolean) | (<S extends T> (value: T, index: number, array: T[]) => value is S)} Predicate<T>
 */

/** @type {<T>(filter: Predicate<T>) => (list: T[]) => T[]}} */
export const useFilter = (filter) => (list) => list.filter(filter);
