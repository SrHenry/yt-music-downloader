import { spawnAsync } from "@/shared/functions/spawnAsync.ts";

/**
 * Runs a command in the shell and returns the output. Throws an error if the command fails.
 *
 * @param command
 * @param args
 *
 * @throws {Error}
 */
export async function spawn(
    command: string,
    ...args: string[]
): Promise<string> {
    const { stdout, stderr } = await spawnAsync([command, ...args].join(" "));

    if (stderr) throw new Error(stderr.trimEnd());

    return stdout.trimEnd();
}
