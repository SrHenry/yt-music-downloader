import type { CommandOptions } from "@/commands/download/types/CommandOptions.ts";
import type { DownloadOptions } from "@/workflow/pipelines/download/music/types/DownloadOptions.ts";

export function mapToPipelineOptions(o: CommandOptions): DownloadOptions {
    const builder = {} as DownloadOptions;

    builder.playlist = o.playlist;
    builder.noProcessing = !o.processing;
    builder.noThumbnail = !o.thumbnail;
    builder.skipDefaultArgs = !o.defaultArgs;

    if (o.outputDir)
        builder.outputDir = o.outputDir.replace(/^\=["']?(.*)["']?$/, "$1");

    if (o.ytDlpArgs.length !== 0) builder.ytDlpArgs = o.ytDlpArgs;

    return builder;
}
