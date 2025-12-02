import { Experimental, helpers } from "@srhenry/type-utils";
const { pipe, enpipe, pipeline } = Experimental;

import chalk from "chalk";

import type { DownloadOptions } from "@/workflow/pipelines/download/music/types/DownloadOptions.ts";

import { printProcessingEntry } from "@/functions/printProcessingEntry.ts";
import { exec } from "@/shared/functions/exec.ts";
import { append } from "@/shared/pipelines/append.ts";
import { $doAsync } from "@/shared/pipelines/do.ts";
import { enpipeIf } from "@/shared/pipelines/enpipeIf.ts";
import { forEachAsync } from "@/shared/pipelines/forEachAsync.ts";
import DefaultOptions from "@/workflow/pipelines/download/music/constants/DefaultDownloadOptions.ts";
import { embedThumbnail } from "@/workflow/pipelines/download/music/pipeline/steps/embedThumbnail/index.ts";
import { fetchMusic } from "@/workflow/pipelines/download/music/pipeline/steps/fetchMusic/index.ts";
import { fetchThumbnail } from "@/workflow/pipelines/download/music/pipeline/steps/fetchTumbnail/index.ts";
import { finish } from "@/workflow/pipelines/download/music/pipeline/steps/finish/index.ts";
import { validateSource } from "@/workflow/pipelines/download/music/pipeline/steps/validateSource/index.ts";
import { fetchPlaylistContentList } from "./pipeline/steps/fetchPlaylistContentList/index.ts";

type RequiredOptions = Requirefy<DownloadOptions>;
type Pipeline = (options: RequiredOptions) => (source: string) => Promise<void>;

const noProcessingParams = [
    "-q",
    "--no-warnings",
    "-x",
    "--audio-quality",
    "0",
    "--embed-metadata",
    "--print",
    "after_move:filepath",
];

const fillNullables = (defaults: RequiredOptions, options: DownloadOptions) => {
    const keys = Object.keys(defaults);
    return keys.map((key) => [key, options[key] ?? defaults[key]] as const);
};

const parseOptions = (options?: DownloadOptions | null): RequiredOptions =>
    options
        ? pipe(options)
              .pipe(enpipe(fillNullables, DefaultOptions))
              .pipe((s) => helpers.arrayToObject(s))
              .depipe()
        : DefaultOptions;

const parseYtDlpParams = ({
    noProcessing,
    outputDir,
    ytDlpArgs,
}: Pick<RequiredOptions, "noProcessing" | "outputDir" | "ytDlpArgs">) => {
    const params: string[] = [];

    if (outputDir) params.push("-P", outputDir);

    if (noProcessing) params.push(...noProcessingParams);

    params.push(...ytDlpArgs);

    return params;
};

const parseFetchArgs = (options: RequiredOptions) => ({
    ...options,
    ytDlpArgs: parseYtDlpParams(options),
    skipDefaultArgs: options.noProcessing || options.skipDefaultArgs,
});

const musicPipeline: Pipeline = (options) => (source) =>
    pipe(Promise.resolve(source))
        .pipeAsync(validateSource())
        .pipeAsync(
            $doAsync(async () => {
                if (options.thumbnailsDir)
                    await exec("mkdir -p", options.thumbnailsDir);
            })
        )
        .pipeAsync(
            enpipeIf(
                !options.noThumbnail,
                fetchThumbnail(options.thumbnailsDir),
                append({ thumbnail_file: null })
            )
        )
        .pipeAsync(
            $doAsync(async () => {
                if (options.outputDir)
                    await exec("mkdir -p", options.outputDir);
            })
        )
        .pipeAsync(fetchMusic(parseFetchArgs(options)))
        .pipeAsync(enpipeIf(!options.noThumbnail, embedThumbnail()))
        .pipeAsync(finish())
        .depipe();

const playlistPipeline: Pipeline = (options) => (source) =>
    pipe(Promise.resolve(source))
        .pipeAsync(validateSource())
        .pipeAsync(fetchPlaylistContentList())
        .pipeAsync(
            $doAsync(async ({ metadata: { entries } }) => {
                if (entries.length > 0 && options.outputDir)
                    await exec("mkdir -p", options.outputDir);
            })
        )
        .pipeAsync(
            forEachAsync(
                (ctx) => ctx.metadata.entries,
                ({ id: yt_src }, _, i, total) =>
                    printProcessingEntry(i + 1, total, () =>
                        pipe(Promise.resolve({ yt_src }))
                            .pipeAsync(
                                enpipeIf(
                                    !options.noThumbnail,
                                    fetchThumbnail(options.thumbnailsDir),
                                    append({ thumbnail_file: null })
                                )
                            )
                            .pipeAsync(fetchMusic(parseFetchArgs(options)))
                            .pipeAsync(
                                enpipeIf(!options.noThumbnail, embedThumbnail())
                            )
                    )
            )
        )
        .pipeAsync(finish())
        .depipe();

const printError = (error: unknown) => console.error(chalk.redBright(error));

/**
 * Describes the pipeline to download music from YouTube and embed the thumbnail.
 */
export async function downloadMusicPipeline(source: string): Promise<void>;
export async function downloadMusicPipeline(
    source: string,
    options: DownloadOptions
): Promise<void>;

export async function downloadMusicPipeline(
    source: string,
    options: DownloadOptions = DefaultOptions
): Promise<void> {
    return await pipeline(parseOptions)
        .pipe(enpipe(options))
        .pipe(
            enpipeIf(
                ({ playlist }) => playlist,
                playlistPipeline,
                musicPipeline
            )
        )
        .pipe(enpipe(source))
        .catch(printError);
}
