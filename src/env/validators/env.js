import "../autoload.js";

import { Experimental } from "@srhenry/type-utils";
import { EnvSchema } from "../schemas/EnvSchema.js";

export const validateEnv = (env) => Experimental.validate(env, EnvSchema);
