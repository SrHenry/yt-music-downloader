import { Experimental } from "@srhenry/type-utils";

import { Options, OptionsSchema } from "../schemas/Options.ts";

export const validate = (value: unknown): OptionsSchema =>
    Experimental.validate(value, Options(), true);
