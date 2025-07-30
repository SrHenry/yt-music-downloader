import chalk from "chalk";

import { pipeline } from "../../pipeline.js";
import { run } from "../../shared/functions/run.js";
import { useAction } from "../_shared/functions/useAction.js";
import { sources } from "./_arguments/sources.js";
import { playlist } from "./_options/playlist.js";
import { validate } from "./_options/validators/OptionsValidator.js";

/**
 * @param {string[]} sources
 * @param {import("commander").OptionValues} _options
 */
export function downloadAction(sources, _options) {
    const { playlist } = validate(_options);

    if (playlist) {
        // TODO: implement playlist parsing & download
        throw new Error("PANIC! Not implemented yet");
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

export const createDownloadCommand =
    () =>
    /**
     * @param {import('commander').Command} program
     */
    (program) => {
        const download = program.command("download");

        download
            .description(
                "downloads music from a list of YouTube URLs or Content IDs"
            )
            .addArgument(sources)
            .addOption(playlist)
            .action(useAction(downloadAction));

        return program;
    };

/**
 * @typedef {(typeof downloadAction) extends import("../_shared/functions/useAction.js").CommandAction<[sources: string[], options: import("commander").OptionValues]> ? "yes" : "no"} AAA
 * @typedef {import("../_shared/functions/useAction.js").AsCommandAction<(typeof downloadAction)> extends never ? "no" : "yes"} BBB
 */
