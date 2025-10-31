import "@/env/__autoload.ts";

import type { Env as EnvType } from "@/env/schemas/EnvSchema.ts";

export const Env = process.env as Prettify<NodeJS.ProcessEnv & EnvType>;
