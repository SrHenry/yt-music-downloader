import { clearLogsAction } from "./logs/index.js";
import { clearMusicAction } from "./music/index.js";

/**
 * @param {import("commander").Command} program
 */
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

    clear
        .command("music")
        .description("deletes all music files on this workspace")
        .option(
            "-e, --allowed-extensions <extensions>",
            "defines which music extension files are to be deleted from workspace",

            "flac,mp3,m4a,aac,ac3,eac3,ogg,wav,wma"
        )
        .action(clearMusicAction);

    return program;
}
