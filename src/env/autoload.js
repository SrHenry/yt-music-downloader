import "dotenv/config";

import { info } from "../log/index.js";
import { validateEnv } from "./validators/env.js";

info("Starting env module...");
validateEnv(process.env);
info("Env module ready!");
