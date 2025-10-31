import { runYtDlp } from "@/functions/runYtDlp.ts";

/**
 * Fetches from the API the thumbnails metadata of a given YouTube source.
 *
 * @param yt_src Music source
 *
 * @returns A promise with an Array containing Thumbnail objects
 */
export async function getThumbnails(yt_src: string): Promise<Thumbnail[]> {
    const args = ["-q", "--no-warnings", "--print", "thumbnails", "-s", yt_src];

    const output = await runYtDlp(...args);

    return JSON.parse(output.replaceAll("'", '"'));
}
