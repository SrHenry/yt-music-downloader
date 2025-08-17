export type Mapper<From, To> = (from: From) => To;

export const map =
    <From, To>(mapper: Mapper<From, To>) =>
    (list: From[]) =>
        list.map(mapper);
