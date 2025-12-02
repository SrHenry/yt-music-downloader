import { Experimental, type Infer, object, string } from "@srhenry/type-utils";

import { runYtDlp } from "@/functions/runYtDlp.ts";
import { error, info } from "@/log/index.ts";

//TODO: Refactor and abstract this file to more modules

const MetadataSchema = () =>
    object({
        id: string(),
    });

type Metadata = Infer<ReturnType<typeof MetadataSchema>>;
type MetadataValidationError = Experimental.ValidationError<
    unknown,
    Metadata[]
>;

const validateMetadata = (
    metadata: unknown
): Experimental.Result<
    Metadata,
    Experimental.ValidationErrors<MetadataValidationError[]>
> => {
    const result = Experimental.validate(metadata, MetadataSchema(), false);

    return result instanceof Experimental.ValidationErrors
        ? [
              <Experimental.ValidationErrors<MetadataValidationError[]>>result,
              null,
          ]
        : [null, result];
};

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
        "-J",
    ];

    info("[progress] [fn:%s] Fetching metadata...", runYtDlp.name);

    const output = await runYtDlp(...args, yt_src);
    const metadata = JSON.parse(output);

    info("[progress] [fn:%s] Validating metadata...", validateMetadata.name);

    const [err, validatedMetadata] = validateMetadata(metadata);

    if (err) {
        error(
            "YouTube source's metadata is not compliant with defined schema!\n %s",
            err.toString()
        );

        throw new TypeError("Unexpected medatata value. Missing properties.");
    }

    return validatedMetadata.id;
}
