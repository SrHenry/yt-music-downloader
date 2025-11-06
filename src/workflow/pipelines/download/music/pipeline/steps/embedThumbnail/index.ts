import type {
    Initializer,
    Input,
    Output,
} from "@/workflow/pipelines/download/music/pipeline/steps/embedThumbnail/types/index.ts";
import type { StepFactory } from "@/workflow/pipelines/types/StepFactory.ts";

import { embedThumbnail as embed } from "@/functions/embedThumbnail.ts";

export const embedThumbnail: StepFactory<[Input, Output], Initializer> =
    () => async (input) => {
        const { thumbnail_file, music_file } = input;

        if (thumbnail_file) {
            console.log("Embedding thumbnail...");
            await embed(music_file, thumbnail_file);
            console.log("Thumbnail embedded!");
        }

        return input;
    };
