import { mkdir } from "node:fs/promises";

export const createDirIfNotExists = (path: string) =>
    mkdir(path, { recursive: true });
