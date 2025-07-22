import "./autoload.js";

import { createClearCommand } from "./commands/clear/index.js";
import { createDownloadCommand } from "./commands/download/index.js";
import { createWorkflowBaseCommand } from "./commands/index.js";

import { Experimental } from "@srhenry/type-utils";

const { pipeline } = Experimental;

pipeline()
    .pipe(() => createWorkflowBaseCommand())
    .pipe(createClearCommand())
    .pipe(createDownloadCommand())
    .depipe()
    .parse();
