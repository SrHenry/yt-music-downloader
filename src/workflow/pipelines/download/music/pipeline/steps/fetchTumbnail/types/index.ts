import { Output as PreviousOutput } from "@/workflow/pipelines/download/music/pipeline/steps/fetchMetadata/types/index.ts";

export type Input =
    | PreviousOutput
    | {
          yt_src: string;
          metadata: null;
      };

export type Output = Prettify<
    Input & {
        thumbnail_file: string;
    }
>;

export type Initializer = [thumbnailDir: string | null] | [];
