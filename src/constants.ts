import type { CropOptions } from "@/types/crop.ts";

import { Env } from "@/env/index.ts";
import { resolve } from "node:path";

export const { ROOT_PATH, THUMBNAILS_PATH } = Env;

export const DEFAULT_CROP_OPTIONS = {
    overwrite: true,
    tempDirectory: resolve(ROOT_PATH, "out/crop"),
} as const satisfies CropOptions;

export default {
    ROOT_PATH,
    THUMBNAILS_PATH,
};
