declare module "@srhenry/type-utils" {
    export namespace helpers {
        export declare function arrayToObject<T extends {}>(
            array: ObjectEntry<T>[]
        ): T;
    }
}
export {};
