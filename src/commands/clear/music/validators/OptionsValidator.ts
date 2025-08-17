import { Experimental } from "@srhenry/type-utils";

import { Options } from "../schemas/Options.ts";

export const validate = (value: unknown) =>
    Experimental.validate(value, Options(), true);
