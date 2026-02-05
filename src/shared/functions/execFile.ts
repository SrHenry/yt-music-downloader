import { ProcessError } from "@/shared/errors/ProcessError.ts";
import { execFileAsync } from "@/shared/functions/execFileAsync.ts";

/**
 * Runs an executable without spawning a shell and returns the output. Throws an error if the command fails.
 *
 * @param command
 * @param args
 *
 * @throws {Error}
 */
export async function execFile(
    command: string,
    ...args: string[]
): Promise<string> {
    const { stdout, stderr } = await execFileAsync(command, args);

    if (stderr)
        throw new ProcessError(
            `Error while executing command ${command}`,
            -1,
            stdout,
            stderr.trimEnd()
        );

    return stdout.trimEnd();
}
