import chalk from "chalk";

import { downloadMusic } from "@/functions/downloadMusic.ts";
import { embedThumbnail } from "@/functions/embedThumbnail.ts";
import { extractYTContentID } from "@/functions/extractYTContentID.ts";
import { fetchThumbnailIfNotExists } from "@/functions/fetchThumbnailIfNotExists.ts";
import { isValidYTContentID } from "@/functions/isValidYTContentID.ts";

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

        // console.log(`Content ID: "${getContentID(yt_src)}"`);
        console.log(`Content ID: "${await extractYTContentID(yt_src)}"`);

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
