import { Argument } from "commander";

export const sources = new Argument(
    "<sources...>",
    "list of YouTube URLs or Content IDs"
);
