/**
 * @template From
 * @template To
 * @typedef {(from: From) => To} Mapper<From, To>
 */

/** @type {<From, To>(mapper: Mapper<From, To>) => (list: From[]) => To[]} */
export const map = (mapper) => (list) => list.map(mapper);
