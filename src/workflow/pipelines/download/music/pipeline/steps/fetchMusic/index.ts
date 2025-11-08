import type {
    Initializer,
    Input,
    Output,
} from "@/workflow/pipelines/download/music/pipeline/steps/fetchMusic/types/index.ts";
import type { StepFactory } from "@/workflow/pipelines/types/StepFactory.ts";

import { downloadMusic } from "@/functions/downloadMusic.ts";

export const fetchMusic: StepFactory<[Input, Output], Initializer> =
    (fetchArgs = null) =>
    async ({ yt_src, thumbnail_file: thumbnail }) => {
        let action = () => downloadMusic(yt_src);

        console.log("Downloading music...");
        if (fetchArgs) {
            if (fetchArgs.ytDlpArgs)
                action = () => downloadMusic(yt_src, fetchArgs.ytDlpArgs);

            if (fetchArgs.skipDefaultArgs)
                action = () =>
                    downloadMusic(yt_src, fetchArgs.ytDlpArgs ?? [], true);
        }

        const music_file = await action();
        console.log("Music downloaded!");

        return { yt_src, thumbnail_file: thumbnail, music_file };
    };
