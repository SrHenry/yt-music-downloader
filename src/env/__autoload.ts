import "dotenv/config";

import { info } from "../log/index.ts";
import { validateEnv } from "./validators/env.ts";

info("Starting env module...");
validateEnv(process.env);
info("Env module ready!");
