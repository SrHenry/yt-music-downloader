import { Options } from "@/commands/download/_options/schemas/Options.ts";

export const { validate } = Options().validator(true);
