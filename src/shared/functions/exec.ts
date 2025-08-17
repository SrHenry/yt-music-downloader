import { execAsync } from "./execAsync.ts";

/**
 * Runs a command in the shell and returns the output. Throws an error if the command fails.
 *
 * @param command
 * @param args
 *
 * @throws {Error}
 */
export async function exec(
    command: string,
    ...args: string[]
): Promise<string> {
    const { stdout, stderr } = await execAsync([command, ...args].join(" "));

    if (stderr) throw new Error(stderr.trimEnd());

    return stdout.trimEnd();
}
