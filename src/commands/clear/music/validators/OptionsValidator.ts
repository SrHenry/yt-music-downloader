import { Experimental } from "@srhenry/type-utils";

import { Options } from "@/commands/clear/music/schemas/Options.ts";

export const validate = (value: unknown) =>
    Experimental.validate(value, Options(), true);
