/** @type {() => (list: string[]) => string[]} */
export const trimList = () => (list) => list.map((str) => str.trim());
