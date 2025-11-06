export const noop =
    () =>
    <T = any>(value: T): T =>
        value;

export default noop;
