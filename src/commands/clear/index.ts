import type { Command } from "commander";

import { clearLogsAction } from "@/commands/clear/logs/index.ts";
import { clearMusicAction } from "@/commands/clear/music/index.ts";

export const createClearCommand = () => (program: Command) => {
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
};
