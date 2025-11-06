export function append<T extends {}>(o: T): <U extends {}>(o: U) => U & T {
    return (base) => Object.assign(base, o);
}

/** pipeline to force async pipeline */
export function appendAsync<T extends {}>(
    o: T
): <U extends {}>(o: U) => Promise<U & T> {
    return (base) => Promise.resolve(Object.assign(base, o));
}
