import { Experimental } from "@srhenry/type-utils";

import { Options } from "@/commands/download/_options/schemas/Options.ts";

export const validate = (value: unknown) =>
    Experimental.validate(value, Options(), true);
