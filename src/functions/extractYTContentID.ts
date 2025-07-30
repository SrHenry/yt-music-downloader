import { Experimental } from "@srhenry/type-utils";
import { runYtDlp } from "./runYtDlp.ts";

const { $switch } = Experimental;

const isEmptyArray = (arr) => arr.length === 0;
const hasOneElement = (arr) => arr.length === 1;

/** @type {Experimental.Lambda<[json: Record<string, any>[]], string>} */
const switcher = $switch()
    .case(isEmptyArray, () => {
        throw new Error("Could not retrieve JSON from yt-dlp");
    })
    .case(hasOneElement, (j) => j[0].id)
    .default((j) => j[0].playlist_id);

export async function extractYTContentID(yt_src) {
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

    return switcher.invoke(j);
}
