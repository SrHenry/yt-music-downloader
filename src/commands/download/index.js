import chalk from "chalk";

import { pipeline } from "../../pipeline.js";
import { sources } from "./arguments/sources.js";

/**
 *
 * @param  {string[]} sources
 */
export async function downloadAction(sources) {
    for (let c = 0; c < sources.length; c++) {
        const yt_src = sources[c];

        console.log();
        console.log(
            "================================================================================"
        );
        console.log(`Processing (${c + 1}/${sources.length}):`);
        console.log();
        console.log();
        await pipeline(yt_src);
        console.log(
            "================================================================================"
        );
        console.log();
        console.log();
    }

    console.log(chalk.green("All done!"));
}

export { sources as sourcesArgument };

/**
 *
 * @param {import('commander').Command} program
 * @returns {import('commander').Command}
 */
export function createDownloadCommand(program) {
    const download = program.command("download");

    download
        .description(
            "downloads music from a list of YouTube URLs or Content IDs"
        )
        .addArgument(sources)
        .action(downloadAction);

    return download;
}
