import { Env } from "@/env/index.ts";

export const { ROOT_PATH, THUMBNAILS_PATH } = Env;

export const DEFAULT_CROP_OPTIONS = {
    overwrite: true,
} as const;

export default {
    ROOT_PATH,
    THUMBNAILS_PATH,
};
