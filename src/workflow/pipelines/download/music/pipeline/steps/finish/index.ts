import type {
    Initializer,
    Input,
    Output,
} from "@/workflow/pipelines/download/music/pipeline/steps/finish/types/index.ts";
import type { StepFactory } from "@/workflow/pipelines/types/StepFactory.ts";

export const finish: StepFactory<[Input, Output], Initializer> =
    () => async (_) => {
        console.log("Done!");
    };
