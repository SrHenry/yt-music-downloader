import "../__autoload.ts";

import { Experimental } from "@srhenry/type-utils";
import { EnvSchema } from "../schemas/EnvSchema.ts";

export const validateEnv = (env) => Experimental.validate(env, EnvSchema);
