import { BASE_LOG_PATHS } from "@/constants.ts";

import { ProcessError } from "@/shared/errors/ProcessError.ts";
import { logProcess } from "@/shared/pipelines/logProcess.ts";

export const logProcessError =
    (procName: keyof typeof BASE_LOG_PATHS) => async (error: ProcessError) =>
        logProcess(procName)(error.stderr ?? "");
