import { OptionsSchema } from "@/commands/download/_options/schemas/Options.ts";

export interface CommandOptions extends OptionsSchema {
    ytDlpArgs: string[];
}
