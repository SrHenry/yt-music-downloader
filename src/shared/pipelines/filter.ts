type Predicate<T> =
    | ((value: T, index: number, array: T[]) => boolean)
    | (<S extends T>(value: T, index: number, array: T[]) => value is S);

export const filter =
    <T>(filter: Predicate<T>) =>
    (list: T[]) =>
        list.filter(filter);
