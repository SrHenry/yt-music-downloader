import { execAsync } from "./execAsync.js";

/**
 * Runs a command in the shell and returns the output. Throws an error if the command fails.
 *
 * @param {string} command
 * @param  {...string} args
 *
 * @returns {Promise<string>}
 *
 * @throws {Error}
 */
export async function exec(command, ...args) {
    const { stdout, stderr } = await execAsync([command, ...args].join(" "));

    if (stderr) throw new Error(stderr.trimEnd());

    return stdout.trimEnd();
}
