import "dotenv/config";

import { validateEnv } from "@/env/validators/env.ts";
import { info } from "@/log/index.ts";

info("Starting env module...");
validateEnv(process.env);
info("Env module ready!");
