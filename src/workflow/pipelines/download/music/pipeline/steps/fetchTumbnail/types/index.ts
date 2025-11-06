import { Output as PreviousOutput } from "@/workflow/pipelines/download/music/pipeline/steps/validateSource/types/index.ts";

export type Input = PreviousOutput;

export type Output = Prettify<
    Input & {
        thumbnail_file: string;
    }
>;

export type Initializer = [];
