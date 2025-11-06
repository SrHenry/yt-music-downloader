import type { Output as PrimaryPreviousOutput } from "@/workflow/pipelines/download/music/pipeline/steps/fetchTumbnail/types/index.ts";
import type { Output as AltPreviousOutput } from "@/workflow/pipelines/download/music/pipeline/steps/validateSource/types/index.ts";

export type Input = Prettify<
    Omit<PrimaryPreviousOutput | AltPreviousOutput, "thumbnail_file"> & {
        thumbnail_file: string | null;
    }
>;

export type Output = Prettify<
    Input & {
        music_file: string;
    }
>;

export type Initializer =
    | []
    | [
          | {
                ytDlpArgs?: string[];
                skipDefaultArgs?: boolean;
            }
          | null
          | undefined
      ];
