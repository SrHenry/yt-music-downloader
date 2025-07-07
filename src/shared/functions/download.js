import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import { generateRandomString } from "./generateRandomString.js";

/**
 * Fetches an URL as a file.
 *
 * @param {string} url
 *
 * @returns {Promise<ArrayBuffer>}
 */
export async function download(url) {
    const response = await fetch(url);
    return await response.arrayBuffer();
}

/**
 * Downloads an URL as a file and writes to a given path.
 *
 * @param {string} url
 * @param {string} filename
 * @param {string} path
 *
 * @returns {Promise<void>}
 *
 */
export async function downloadAsFile(url, filename = false, path = false) {
    const buf = await download(url);

    if (!path) return buf;

    if (!filename) filename = generateRandomString(10);

    await writeFile(join(path, filename), Buffer.from(buf));
}
