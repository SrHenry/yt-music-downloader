import "../__autoload.ts";

import { EnvSchema } from "@/env/schemas/EnvSchema.ts";

export const { validate: validateEnv } = EnvSchema.validator();
