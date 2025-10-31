import {
    array,
    asNull,
    Experimental,
    object,
    or,
    string,
} from "@srhenry/type-utils";

import { runYtDlp } from "@/functions/runYtDlp.ts";

//TODO: Refactor and abstract this file to more modules

const isMetadata = object({
    id: string(),
    playlist_id: or.optional(string(), asNull()),
});
const isEmptyArray = <T = unknown>(arr: Array<T>) => arr.length === 0;
const hasOneElement = <T = unknown>(arr: Array<T>) => arr.length === 1;

/**
 * It fetches the YouTube ID from a YouTube source
 *
 * @param yt_src Music source
 *
 * @returns A promise containing the YouTube ID for the source
 */
export async function extractYTContentID(yt_src: string) {
    const args = [
        "--simulate",
        "--quiet",
        "--flat-playlist",
        "--no-warnings",
        "-j",
    ];

    const j = await runYtDlp(...args, yt_src).then((o) =>
        o.split("\n").map((row) => JSON.parse(row))
    );

    if (isEmptyArray(j))
        throw new Error("Could not retrieve JSON from yt-dlp.");

    if (!j.every(isMetadata)) {
        const validationErrors = Experimental.validate(
            j[0],
            isMetadata,
            false
        ) as Experimental.ValidationErrors;

        error(
            "YouTube source's metadata is not compliant with defined schema!\n %s",
            validationErrors.toString()
        );

        throw new TypeError("Unexpected medatata value. Missing properties.");
    }

    if (hasOneElement(j)) return j[0].id;

    return j[0].playlist_id!;
}
