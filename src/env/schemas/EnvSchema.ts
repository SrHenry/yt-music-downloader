import "../__autoload.js";

import { object, string } from "@srhenry/type-utils";

export const EnvSchema = object({
    ROOT_PATH: string(),
    THUMBNAILS_PATH: string(),
});

/**
 * @typedef {import('@srhenry/type-utils').GetTypeGuard<typeof EnvSchema>} EnvSchema
 */
