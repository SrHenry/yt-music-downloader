import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import { generateRandomString } from "./generateRandomString.ts";

/**
 * Fetches an URL as a file.
 *
 * @param {string} url
 *
 * @returns {Promise<ArrayBuffer>}
 */
export async function download(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url);
    return await response.arrayBuffer();
}

/**
 * Downloads an URL as a file and writes to a given path.
 *
 * @param {string} url
 *
 * @returns
 */
export async function downloadAsFile(url: string): Promise<Buffer<ArrayBuffer>>;
/**
 * Downloads an URL as a file and writes to a given path.
 *
 * @param {string} url
 * @param {string} filename
 *
 * @returns
 */
export async function downloadAsFile(
    url: string,
    filename: string
): Promise<Buffer<ArrayBuffer>>;
/**
 * Downloads an URL as a file and writes to a given path.
 *
 * @param {string} url
 * @param {string} filename
 * @param {string} path
 *
 * @returns
 */
export async function downloadAsFile(
    url: string,
    filename: string,
    path: string
): Promise<void>;

export async function downloadAsFile(
    url: string,
    filename: string | null = null,
    path: string | null = null
): Promise<void | Buffer> {
    const buf = await download(url).then((b) => Buffer.from(b));

    if (!path) return buf;

    if (!filename) filename = generateRandomString(10);

    await writeFile(join(path, filename), buf);
}
