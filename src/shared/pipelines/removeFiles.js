import { unlink } from "node:fs/promises";

/** @returns {(files: string[]) => Promise<PromiseSettledResult<void>[]> } */
export const removeFiles = () => async (files) =>
    await Promise.allSettled(files.map((path) => unlink(path)));
