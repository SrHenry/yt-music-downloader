import type { Dirent } from "node:fs";

import { resolve } from "node:path";

export const extractFullPath = (files: Dirent[]) =>
    files.map(({ name, parentPath }) => resolve(parentPath, name));
