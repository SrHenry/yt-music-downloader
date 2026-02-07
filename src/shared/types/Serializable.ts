import { Tag } from "@srhenry/type-utils";

type _OmitFunctions<T extends object> = {
    [K in keyof T as T[K] extends (...args: any[]) => any
        ? never
        : K]: T[K] extends {} ? Prettify<_OmitFunctions<T[K]>> : T[K];
};

export type Serializable<T extends object = {}> = Tag<
    Prettify<_OmitFunctions<T>>,
    "serializable",
    true
>;
