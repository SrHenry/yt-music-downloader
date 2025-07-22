import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { error } from "./log/index.js";

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
    .filter(({ status }) => status === "rejected")
    .forEach(({ reason }) =>
        error("Error while importing autoload module: ", reason)
    );

export default importAttempts
    .filter(({ status }) => status === "fulfilled")
    .map(({ value }) => value);
