import { runYtDlp } from "@/functions/runYtDlp.ts";
import { error, info } from "@/log/index.ts";
import { parseValidationResult } from "@/shared/pipelines/parseValidationResult.ts";
import {
    type Infer,
    type Result,
    type ValidationError,
    ValidationErrors,
    object,
    string,
} from "@srhenry/type-utils";

//TODO: Refactor and abstract this file to more modules

const MetadataSchema = () =>
    object({
        id: string(),
    });

type Metadata = Infer<ReturnType<typeof MetadataSchema>>;
type MetadataValidationError = ValidationError<unknown, Metadata>;

const parseResult = parseValidationResult<Metadata, MetadataValidationError>();

const validateMetadata = (
    metadata: unknown,
): Result<Metadata, ValidationErrors<MetadataValidationError>> => {
    const result = MetadataSchema().validator(false).validate(metadata);

    return parseResult(result);
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
            err.toString(),
        );

        throw new TypeError("Unexpected medatata value. Missing properties.");
    }

    return validatedMetadata.id;
}
