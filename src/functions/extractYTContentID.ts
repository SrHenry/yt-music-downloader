import {
    array,
    asNull,
    Experimental,
    type GetTypeGuard,
    object,
    or,
    string,
} from "@srhenry/type-utils";

import { runYtDlp } from "@/functions/runYtDlp.ts";
import { error, info } from "@/log/index.ts";

//TODO: Refactor and abstract this file to more modules

const MetadataSchema = () =>
    object({
        id: string(),
        playlist_id: or.optional(string(), asNull()),
    });
const MetadataArraySchema = () => array(MetadataSchema());

const isEmptyArray = <T = unknown>(arr: Array<T>) => arr.length === 0;
const hasOneElement = <T = unknown>(arr: Array<T>) => arr.length === 1;

type Metadata = GetTypeGuard<ReturnType<typeof MetadataSchema>>;
type MetadataValidationError = Experimental.ValidationError<
    unknown,
    Metadata[]
>;

const validateMetadata = (
    metadata: unknown
): Experimental.Result<
    Metadata[],
    Experimental.ValidationErrors<MetadataValidationError[]>
> => {
    const result = Experimental.validate(
        metadata,
        MetadataArraySchema(),
        false
    );

    return result instanceof Experimental.ValidationErrors
        ? [
              <Experimental.ValidationErrors<MetadataValidationError[]>>result,
              null,
          ]
        : [null, result];
};

const parseOutputAsJson = (output: string) =>
    output.split("\n").map((row) => JSON.parse(row));

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

    info("[progress] [fn:%s] Fetching metadata...", runYtDlp.name);

    const output = await runYtDlp(...args, yt_src);
    const metadata = parseOutputAsJson(output);

    info("[progress] [fn:%s] Validating metadata...", isEmptyArray.name);

    if (isEmptyArray(metadata))
        throw new Error("Could not retrieve JSON from yt-dlp.");

    info("[progress] [fn:%s] Validating metadata...", validateMetadata.name);

    const [err, validatedMetadata] = validateMetadata(metadata);

    if (err) {
        error(
            "YouTube source's metadata is not compliant with defined schema!\n %s",
            err.toString()
        );

        throw new TypeError("Unexpected medatata value. Missing properties.");
    }

    info(
        "[progress] [fn:%s] Metadata validated sucessfully! Fetching ID/Playlist ID...",
        hasOneElement.name
    );

    if (hasOneElement(validatedMetadata)) return validatedMetadata[0].id;

    return validatedMetadata[0].playlist_id!;
}
