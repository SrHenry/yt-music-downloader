import { Option } from "commander";

export const playlist = new Option(
    "-p, --playlist",
    "informs the program to treat <sources> as playlists"
).default(false);
