import type { Command, OptionValues } from "commander";

import chalk from "chalk";

import { validate } from "@/commands/download/_options/validators/OptionsValidator.ts";
import { mapToPipelineOptions } from "@/commands/download/functions/mapToPipelineOptions.ts";
import { fetchExtraArgs } from "@/functions/fetchExtraArgs.ts";
import { removeSubArray } from "@/shared/functions/removeSubArray.ts";
import { append } from "@/shared/pipelines/append.ts";
import { transform } from "@/shared/pipelines/transform.ts";
import { Experimental } from "@srhenry/type-utils";
import { processDownload } from "./processDownload.ts";

const { pipe, enpipe } = Experimental;

export async function downloadAction(
    sources: string[],
    options: OptionValues,
    _: Command,
    _extraArgs: string[]
) {
    await pipe(validate)
        .pipe(enpipe(options))
        .pipe(append({ ytDlpArgs: fetchExtraArgs() }))
        .pipe(mapToPipelineOptions)
        // .pipe($do<DownloadOptions>(console.log.bind(null, "\nOptions:")))
        .pipe(
            transform(
                (options) =>
                    [
                        removeSubArray(sources, options.ytDlpArgs!),
                        options,
                    ] as const
            )
        )
        .pipe(([sources, options]) => processDownload(sources, options))
        .then(() => console.log(chalk.green("All done!")));
}
