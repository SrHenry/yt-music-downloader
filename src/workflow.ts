import "@/autoload.ts";

import { createClearCommand } from "@/commands/clear/index.ts";
import { createDownloadCommand } from "@/commands/download/index.ts";
import { createWorkflowBaseCommand } from "@/commands/index.ts";

import { Experimental } from "@srhenry/type-utils";

const { pipeline } = Experimental;

pipeline()
    .pipe(() => createWorkflowBaseCommand())
    .pipe(createClearCommand())
    .pipe(createDownloadCommand())
    .depipe()
    .parse();
