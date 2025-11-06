import { Option } from "commander";

export const noDefaultArgs = new Option(
    "-x, --no-default-args",
    "informs the program to skip default arguments passed to yt-dlp "
); //.default(false);
