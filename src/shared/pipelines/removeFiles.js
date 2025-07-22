import { unlink } from "node:fs/promises";

/** @returns {(files: string[]) => Promise<void> } */
export const removeFiles = () => async (files) =>
    void (await Promise.all(files.map((path) => unlink(path))));
