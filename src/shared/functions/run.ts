import { Experimental } from "@srhenry/type-utils";

export const run = <T>(fn: Experimental.Func0<T>) => fn();
