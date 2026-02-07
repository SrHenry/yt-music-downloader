import "@/env/__autoload.ts";

import { object, string, type Infer } from "@srhenry/type-utils";

export const EnvSchema = object({
    ROOT_PATH: string(),
    THUMBNAILS_PATH: string(),
});

export type Env = Infer<typeof EnvSchema>;
