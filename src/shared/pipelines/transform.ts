export function transform<T, U>(fn: (value: T) => U): (value: T) => U {
    return (value: T) => fn(value);
}
