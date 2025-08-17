import chalk from "chalk";

import { type Command, OptionValues } from "commander";
import { pipeline } from "../../pipeline.ts";
import { run } from "../../shared/functions/run.ts";
import { sources } from "./_arguments/sources.ts";
import { playlist } from "./_options/playlist.ts";
import { validate } from "./_options/validators/OptionsValidator.ts";

export async function downloadAction(
    sources: string[],
    _options: OptionValues
) {
    const { playlist } = validate(_options);

    if (playlist) {
        // TODO: implement playlist parsing & download
        return void console.error(
            chalk.redBright("PANIC! '-p' flag not implemented yet")
        );
    }

    run(async () => {
        for (let i = 0; i < sources.length; i++) {
            const c = i + 1;
            const yt_src = sources[i];

            console.log();
            console.log(
                "================================================================================"
            );
            console.log(`Processing (${c}/${sources.length}):`);
            console.log();
            console.log();

            await pipeline(yt_src).catch((err) =>
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
