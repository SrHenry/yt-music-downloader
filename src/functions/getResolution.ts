import { string, TypeGuard } from "@srhenry/type-utils";

type Resolution = `${number}x${number}`;

const isValidResolutionString: TypeGuard<Resolution> = string(
    /[0-9]+x[0-9]+/g
) as TypeGuard<Resolution>;

/**
 * Extracts the resolution of a thumbnail object.
 *
 * @param thumbnail
 * @returns Resolution as string (Ex.: `"512x512"`)
 */
export function getResolution(thumbnail: Thumbnail): Resolution | "unknown" {
    if (
        "resolution" in thumbnail &&
        isValidResolutionString(thumbnail.resolution)
    )
        return thumbnail.resolution;

    if (
        "width" in thumbnail &&
        "height" in thumbnail &&
        typeof thumbnail.width === "number" &&
        typeof thumbnail.height === "number"
    )
        return `${thumbnail.width}x${thumbnail.height}`;

    return "unknown";
}
