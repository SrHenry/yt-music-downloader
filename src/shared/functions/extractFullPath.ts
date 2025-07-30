import { resolve } from "node:path";

/** @param {Dirent[]} files */
export const extractFullPath = (files) =>
    files.map(({ name, parentPath }) => resolve(parentPath, name));
