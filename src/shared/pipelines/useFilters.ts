type Predicate<T> =
    | ((value: T, index: number, array: T[]) => boolean)
    | (<S extends T>(value: T, index: number, array: T[]) => value is S);

export const useFilters =
    <T>(filters: Predicate<T>[]) =>
    (list: T[]) =>
        filters.reduce((_, fn) => _.filter(fn), list);
