import type { Dirent, PathLike } from "node:fs";
import { readdir } from "node:fs/promises";

export type ListDirOptions = { recursive?: boolean };

type listDirWrappedFn = (path: PathLike) => Promise<Dirent[]>;

export function listDir(): listDirWrappedFn;
export function listDir(options: ListDirOptions): listDirWrappedFn;

export function listDir(
    options: ListDirOptions = { recursive: true }
): listDirWrappedFn {
    return (path) => readdir(path, { withFileTypes: true, ...options });
}
