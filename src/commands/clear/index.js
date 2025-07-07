import { clearLogsAction } from "./logs/index.js";

/** @param {import("commander").Command} program */
export function createClearCommand(program) {
    const clear = program
        .command("clear")
        .description("clears generated files");

    clear
        .command("logs")
        .description("trims old logs")
        .option(
            "-t, --time <days>",
            "defines a treshold to delete logs older than the ammount of days specified",
            String(30)
        )
        .action(clearLogsAction);
}
