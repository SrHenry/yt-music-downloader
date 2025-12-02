import type {
    Initializer,
    Input,
    Output,
} from "@/workflow/pipelines/download/music/pipeline/steps/fetchTumbnail/types/index.ts";
import type { StepFactory } from "@/workflow/pipelines/types/StepFactory.ts";

import { fetchThumbnailIfNotExists } from "@/functions/fetchThumbnailIfNotExists.ts";
import { info } from "@/log/index.ts";

export const fetchThumbnail: StepFactory<[Input, Output], Initializer> =
    (thumbnailDir = null) =>
    async ({ yt_src }) => {
        info(
            "[progress] [fn:%s] Fetching thumbnail...",
            fetchThumbnailIfNotExists.name
        );

        const thumbnail_file = await fetchThumbnailIfNotExists(
            yt_src,
            thumbnailDir
        );

        return { yt_src, thumbnail_file };
    };
