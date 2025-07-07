import { createClearCommand } from "./commands/clear/index.js";
import { createDownloadCommand } from "./commands/download/index.js";
import { createWorkflowBaseCommand } from "./commands/index.js";

const workflow = createWorkflowBaseCommand();

createClearCommand(workflow);
createDownloadCommand(workflow);

// runWorkflow();

workflow.parse();
