import type { Command } from "commander";

import { sources } from "@/commands/download/_arguments/sources.ts";
import { noDefaultArgs } from "@/commands/download/_options/noDefaultArgs.ts";
import { noProcessing } from "@/commands/download/_options/noProcessing.ts";
import { noThumbnail } from "@/commands/download/_options/noThumbnail.ts";
import { playlist } from "@/commands/download/_options/playlist.ts";
import { downloadAction } from "@/commands/download/downloadAction.ts";

export {
    downloadAction,
    playlist as playlistOption,
    sources as sourcesArgument,
};

export const createDownloadCommand = () => (program: Command) => {
    const download = program.command("download");

    download
        .description(
            "downloads music from a list of YouTube URLs or Content IDs"
        )
        .addArgument(sources)
        .addOption(playlist)
        .addOption(noThumbnail)
        .addOption(noProcessing)
        .addOption(noDefaultArgs)
        .action(downloadAction);

    return program;
};
