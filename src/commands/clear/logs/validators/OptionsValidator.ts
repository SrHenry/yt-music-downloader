import { Experimental } from "@srhenry/type-utils";

import {
    Options,
    OptionsSchema,
} from "@/commands/clear/logs/schemas/Options.ts";

export const validate = (value: unknown): OptionsSchema =>
    Experimental.validate(value, Options(), true);
