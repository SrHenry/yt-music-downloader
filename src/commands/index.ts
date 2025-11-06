import { Command } from "commander";

import { noDefaultArgs } from "@/commands/download/_options/noDefaultArgs.ts";
import { noProcessing } from "@/commands/download/_options/noProcessing.ts";
import { noThumbnail } from "@/commands/download/_options/noThumbnail.ts";
import {
    downloadAction,
    playlistOption,
    sourcesArgument,
} from "@/commands/download/index.ts";

export const createWorkflowBaseCommand = () =>
    new Command()
        .name("workflow")
        .description(
            "A CLI to automate the worflow of music downloading from YouTube Music"
        )
        .addArgument(sourcesArgument)
        .addOption(playlistOption)
        .addOption(noThumbnail)
        .addOption(noProcessing)
        .addOption(noDefaultArgs)
        .enablePositionalOptions()
        .action(downloadAction)
        .showHelpAfterError();
