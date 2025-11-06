import { printProcessingEntry } from "@/functions/printProcessingEntry.ts";
import { downloadMusicPipeline } from "@/workflow/pipelines/download/music/index.ts";
import { DownloadOptions } from "@/workflow/pipelines/download/music/types/DownloadOptions.ts";

export async function processDownload(
    sources: string[],
    options: DownloadOptions
) {
    for (const [source, c] of sources.map((s, i) => [s, i + 1] as const)) {
        const run = () =>
            downloadMusicPipeline(source, options).catch((err) =>
                console.error(`Error while processing playlist:`, err)
            );

        if (options.playlist) return await run();

        return await printProcessingEntry(c, sources.length, run);
    }
}
