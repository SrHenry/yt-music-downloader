import "../__autoload.ts";

import { EnvSchema } from "@/env/schemas/EnvSchema.ts";
import { Experimental } from "@srhenry/type-utils";

export const validateEnv = (env: unknown) =>
    Experimental.validate(env, EnvSchema);
