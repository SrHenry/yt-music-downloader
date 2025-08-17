import { readdirSync } from "node:fs";
import { resolve } from "node:path";

import { error } from "./log/index.ts";
import { isFulfilledResult } from "./shared/functions/isFulfilledResult.ts";
import { isRejectedResult } from "./shared/functions/isRejectedResult.ts";

const autoloadFiles = readdirSync(resolve(import.meta.dirname, "../"), {
    recursive: true,
    withFileTypes: true,
})
    .filter((entry) => entry.isFile())
    .filter((file) => /^__autoload\.[cm]?js$/g.test(file.name));

const importAttempts = await Promise.allSettled(
    autoloadFiles
        .map(({ parentPath, name }) => resolve(parentPath, name))
        .map((module) => import(module))
);

importAttempts
    .filter(isRejectedResult)
    .forEach(({ reason }) =>
        error("Error while importing autoload module: ", reason)
    );

export default importAttempts
    .filter(isFulfilledResult)
    .map(({ value }) => value);
