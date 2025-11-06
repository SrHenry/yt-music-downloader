import { Option } from "commander";

export const noProcessing = new Option(
    "-P, --no-processing",
    "informs the program to not process the music file in any way, download as is"
); //.default(false);
