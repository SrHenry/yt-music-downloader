import { spawn, type SpawnOptions } from "node:child_process";

import { ProcessError } from "@/shared/errors/ProcessError.ts";

export type SpawnAsyncReturnType = {
    stdout: string;
    stderr: string;
};

/**
 * Spawns a child process and returns a Promise.
 * The Promise resolves if the process exits with code 0.
 * The Promise rejects if the process emits an 'error' or exits with a non-zero code.
 *
 * @param command The command to run.
 * @returns
 */
export function spawnAsync(command: string): Promise<SpawnAsyncReturnType>;

/**
 * Spawns a child process and returns a Promise.
 * The Promise resolves if the process exits with code 0.
 * The Promise rejects if the process emits an 'error' or exits with a non-zero code.
 *
 * @param command The command to run.
 * @param args List of arguments.
 * @returns
 */
export function spawnAsync(
    command: string,
    args: string[]
): Promise<SpawnAsyncReturnType>;

/**
 * Spawns a child process and returns a Promise.
 * The Promise resolves if the process exits with code 0.
 * The Promise rejects if the process emits an 'error' or exits with a non-zero code.
 *
 * @param command The command to run.
 * @param args List of arguments.
 * @param options Spawn options.
 * @returns
 */
export function spawnAsync(
    command: string,
    args: string[],
    options: SpawnOptions
): Promise<SpawnAsyncReturnType>;

/**
 * Spawns a child process and returns a Promise.
 * The Promise resolves if the process exits with code 0.
 * The Promise rejects if the process emits an 'error' or exits with a non-zero code.
 *
 * @param command The command to run.
 * @param args List of arguments.
 * @param options Spawn options.
 * @returns
 */
export function spawnAsync(
    command: string,
    args: string[] = [],
    options: SpawnOptions = {}
): Promise<SpawnAsyncReturnType> {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, options);
        const stdout = "";
        const stderr = "";

        if (!child.stdout || !child.stderr)
            return void reject(
                new Error(
                    "Failed to spawn process with stdout or stderr streams"
                )
            );

        child.stdout?.on("data", (data) => stdout.concat(data.toString()));

        child.stderr?.on("data", (data) => stderr.concat(data.toString()));

        child.on("close", (code) => {
            if (code !== 0)
                return void reject(
                    new ProcessError(
                        `Process failed with code ${code}: ${stderr.trim()}`,
                        code ?? -1,
                        stdout,
                        stderr
                    )
                );

            return void resolve({ stdout, stderr });
        });

        child.on("error", reject);
    });
}
