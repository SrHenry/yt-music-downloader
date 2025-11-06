import type {
    Initializer,
    Input,
    Output,
} from "@/workflow/pipelines/download/music/pipeline/steps/validateSource/types/index.ts";
import type { StepFactory } from "@/workflow/pipelines/types/StepFactory.ts";

import { extractYTContentID } from "@/functions/extractYTContentID.ts";
import { isValidYTContentID } from "@/functions/isValidYTContentID.ts";
import { info } from "@/log/index.ts";

export const validateSource: StepFactory<[Input, Output], Initializer> =
    () => async (source) => {
        if (!(await isValidYTContentID(source)))
            throw new Error("Invalid URL or Content ID!");

        info(
            "[progress] [fn:%s] Extracting YouTube ID from: %s",
            extractYTContentID.name,
            source
        );

        const yt_src = await extractYTContentID(source);

        console.log(`Content ID: "${yt_src}"`);

        return { yt_src };
    };
