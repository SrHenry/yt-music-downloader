import chalk from "chalk";

import { downloadMusic } from "@/functions/downloadMusic.ts";
import { embedThumbnail } from "@/functions/embedThumbnail.ts";
import { extractYTContentID } from "@/functions/extractYTContentID.ts";
import { fetchThumbnailIfNotExists } from "@/functions/fetchThumbnailIfNotExists.ts";
import { isValidYTContentID } from "@/functions/isValidYTContentID.ts";
import { info } from "@/log/index.ts";

/**
 * Describes the pipeline to download music from YouTube and embed the thumbnail.
 */
export async function pipeline(source: string | null = null): Promise<void> {
    try {
        if (!source)
            throw new Error(
                "You must provide a YouTube URL, or a Youtube Content ID"
            );

        if (!(await isValidYTContentID(source)))
            throw new Error("Invalid URL or Content ID!");

        info(
            "[progress] [fn:%s] Extracting YouTube ID from: %s",
            extractYTContentID.name,
            source
        );

        const yt_src = await extractYTContentID(source);

        // console.log(`Content ID: "${getContentID(yt_src)}"`);
        console.log(`Content ID: "${yt_src}"`);

        info(
            "[progress] [fn:%s] Fetching thumbnail...",
            fetchThumbnailIfNotExists.name
        );

        const thumbnailFile = await fetchThumbnailIfNotExists(yt_src);

        console.log("Downloading music...");
        const music_file = await downloadMusic(yt_src);
        console.log("Music downloaded!");

        console.log("Embedding thumbnail...");
        await embedThumbnail(music_file, thumbnailFile);
        console.log("Thumbnail embedded!");

        console.log("Done!");
    } catch (error) {
        console.error(chalk.redBright(error));
    }
}
