import { Experimental } from "@srhenry/type-utils";
import type { OptionValues } from "commander";
import type { Dirent } from "node:fs";

import { __root__ } from "@/__root__.ts";
import { countSucessfullyRemoved } from "@/commands/_shared/pipelines/countSucessfullyRemoved.ts";
import { validate } from "@/commands/clear/music/pipelines/Options/validate.ts";
import { OptionsSchema } from "@/commands/clear/music/schemas/Options.ts";
import { extractFullPath } from "@/shared/functions/extractFullPath.ts";
import { $do } from "@/shared/pipelines/do.ts";
import { listDir } from "@/shared/pipelines/listDir.ts";
import { logExceptions } from "@/shared/pipelines/logExceptions.ts";
import { printMessage } from "@/shared/pipelines/printMessage.ts";
import { removeFiles } from "@/shared/pipelines/removeFiles.ts";
import { split } from "@/shared/pipelines/split.ts";
import { trimList as trim } from "@/shared/pipelines/trimList.ts";
import { useFilters } from "@/shared/pipelines/useFilters.ts";

type Predicate<T> =
    | ((value: T, index: number, array: T[]) => boolean)
    | (<S extends T>(value: T, index: number, array: T[]) => value is S);

const musicPath = __root__;
const { pipe } = Experimental;

const useAllowedExtensions = (allowedExtensions: string[]) => (file: Dirent) =>
    file.isFile() &&
    new RegExp(`.(${allowedExtensions.join("|")})$`).test(file.name);

const createFilter = () => (allowedExtensions: string[]) =>
    useAllowedExtensions(allowedExtensions);

const getPaths =
    () =>
    (music: Dirent[]): string[] =>
        extractFullPath(music);

const getAllowedExtensionsList =
    () =>
    ({ allowedExtensions }: OptionsSchema) =>
        allowedExtensions;

export const clearMusic = () => (filter: Predicate<Dirent>) =>
    pipe(musicPath)
        .pipe(listDir({ recursive: false }))
        .pipeAsync(useFilters([filter]))
        .pipeAsync(getPaths())
        .pipeAsync(removeFiles())
        .pipeAsync($do(logExceptions<any>("Error while deleting files: %s")))
        .pipeAsync(countSucessfullyRemoved())
        .pipeAsync(printMessage("Removed :{count} music files.")<[number]>)
        .depipe();

export const clearMusicAction = (options: OptionValues) =>
    pipe(options)
        .pipe(validate())
        .pipe(getAllowedExtensionsList())
        .pipe(split(","))
        .pipe(trim())
        .pipe(createFilter())
        .pipe(clearMusic())
        .depipe();
