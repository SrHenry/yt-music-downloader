import { Command } from "commander";

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
        .action(downloadAction)
        .showHelpAfterError();
