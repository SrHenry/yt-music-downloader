import { unlink } from "node:fs/promises";

export const removeFiles = () => async (files: string[]) =>
    await Promise.allSettled(files.map((path) => unlink(path)));
