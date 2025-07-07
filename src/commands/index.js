import { Command } from "commander";
import { downloadAction, sourcesArgument } from "./download/index.js";

export const createWorkflowBaseCommand = () =>
    new Command()
        .name("workflow")
        .description(
            "A CLI to automate the worflow of music downloading from YouTube Music"
        )
        .addArgument(sourcesArgument)
        .action(downloadAction)
        .showHelpAfterError();
