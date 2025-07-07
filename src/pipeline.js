import chalk from "chalk";
import { downloadMusic } from "./functions/downloadMusic.js";
import { embedThumbnail } from "./functions/embedThumbnail.js";
import { extractYTContentID } from "./functions/extractYTContentID.js";
import { fetchThumbnailIfNotExists } from "./functions/fetchThumbnailIfNotExists.js";
import { isValidYTContentID } from "./functions/isValidYTContentID.js";

/**
 * Describes the pipeline to download music from YouTube and embed the thumbnail.
 *
 * @param {string} yt_src
 *
 * @returns {Promise<void>}
 */
export async function pipeline(yt_src = false) {
    try {
        if (!yt_src)
            throw new Error(
                "You must provide a YouTube URL, or a Youtube Content ID"
            );

        if (!(await isValidYTContentID(yt_src)))
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
