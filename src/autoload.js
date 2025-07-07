import { readdirSync } from "node:fs";
import { resolve } from "node:path";

const autoloadFiles = readdirSync(resolve(import.meta.dirname, "../"), {
    recursive: true,
    withFileTypes: true,
})
    .filter((entry) => entry.isFile())
    .filter((file) => /^__autoload\.[cm]?js$/g.test(file.name));

for (const file of autoloadFiles) {
    await import(resolve(file.parentPath, file.name));
}
