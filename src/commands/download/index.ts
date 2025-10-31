import chalk from "chalk";
import { type Command, OptionValues } from "commander";

import { sources } from "@/commands/download/_arguments/sources.ts";
import { playlist } from "@/commands/download/_options/playlist.ts";
import { validate } from "@/commands/download/_options/validators/OptionsValidator.ts";
import { pipeline } from "@/pipeline.ts";
import { run } from "@/shared/functions/run.ts";

export async function downloadAction(
    sources: string[],
    _options: OptionValues
) {
    const { playlist } = validate(_options);

    if (playlist) {
        // TODO: implement playlist parsing & download
        throw new Error("PANIC! Not implemented yet");
    }

    run(async () => {
        for (let i = 0; i < sources.length; i++) {
            const c = i + 1;
            const source = sources[i];

            console.log();
            console.log(
                "================================================================================"
            );
            console.log(`Processing (${c}/${sources.length}):`);
            console.log();
            console.log();

            await pipeline(source).catch((err) =>
                console.error(`Error while processing entry #${c}:`, err)
            );

            console.log(
                "================================================================================"
            );
            console.log();
            console.log();
        }

        console.log(chalk.green("All done!"));
    });
}

export { playlist as playlistOption, sources as sourcesArgument };

export const createDownloadCommand = () => (program: Command) => {
    const download = program.command("download");

    download
        .description(
            "downloads music from a list of YouTube URLs or Content IDs"
        )
        .addArgument(sources)
        .addOption(playlist)
        .action(downloadAction);

    return program;
};
