import { readdir } from "node:fs/promises";

/**
 * @typedef {{ recursive?: boolean }} ListDirOptions
 */

/**
 * @param {ListDirOptions} options
 * @return {(path: import('node:fs').PathLike) => Promise<import('node:fs').Dirent>} */
export const listDir =
    (
        options = {
            recursive: true,
        }
    ) =>
    (path) =>
        readdir(path, {
            withFileTypes: true,
            ...options,
        });
