import type { OptionValues } from "commander";

import type { ParsedOptions } from "./transformers/OptionsTransformer.ts";

import { Dirent, type Stats } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve } from "node:path";

import { Experimental } from "@srhenry/type-utils";

import { __root__ } from "../../../__root__.ts";
import { extractFullPath } from "../../../shared/functions/extractFullPath.ts";
import { $do } from "../../../shared/pipelines/do.ts";
import { listDir } from "../../../shared/pipelines/listDir.ts";
import { logExceptions } from "../../../shared/pipelines/logExceptions.ts";
import { map, Mapper } from "../../../shared/pipelines/map.ts";
import { printMessage } from "../../../shared/pipelines/printMessage.ts";
import { removeFiles } from "../../../shared/pipelines/removeFiles.ts";
import { useFilters } from "../../../shared/pipelines/useFilters.ts";
import { countSucessfullyRemoved } from "../../_shared/pipelines/countSucessfullyRemoved.ts";
import { parse } from "./pipelines/Options/parse.ts";
import { validate } from "./pipelines/Options/validate.ts";

const logsPath = resolve(__root__, "logs");

const filterLogsByExtension =
    (extension = ".log") =>
    (logs: Dirent[]) =>
        logs.filter((log) => log.isFile() && log.name.endsWith(extension));

const isDirentArray = (files: unknown[]): files is Dirent[] =>
    files[0] instanceof Dirent;

type FileWithStats = [file: string, stats: Stats];

const getStats =
    () =>
    (files: string[] | Dirent[]): Promise<FileWithStats[]> =>
        Promise.all(
            (isDirentArray(files) ? extractFullPath(files) : files).map(
                (file) => Promise.all([file, stat(file)])
            )
        );

const isOlderThan =
    (time: Date) =>
    ([, stat]: FileWithStats): boolean =>
        stat.mtimeMs < time.getTime();

type Predicate<T> =
    | ((value: T, index: number, array: T[]) => boolean)
    | (<S extends T>(value: T, index: number, array: T[]) => value is S);

const filterStatsBy = (filters: Predicate<FileWithStats>[]) =>
    useFilters(filters);

/**
 * This function maps a given number to a Date object representing a date with the given number of days before the current date
 *
 * @param n Number of days to go back from current date
 * @returns Date object representing `n` days before current date
 */
const mapDaysToDate = (n: number) => {
    const d = new Date();

    d.setDate(d.getDate() - n);

    return d;
};

const filterStatsOlderThan = (time: Date | number) => {
    if (typeof time === "number") time = mapDaysToDate(time);

    return filterStatsBy([isOlderThan(time)]);
};

const fileToPath: () => Mapper<FileWithStats, string> =
    () =>
    ([path]) =>
        path;

const getTime =
    () =>
    ({ time }: ParsedOptions) =>
        time;

const clearLogs = () => (time: number) =>
    Experimental.pipe(logsPath)
        .pipe(listDir())
        .pipeAsync(filterLogsByExtension())
        .pipeAsync(getStats())
        .pipeAsync(filterStatsOlderThan(time))
        .pipeAsync(map(fileToPath()))
        .pipeAsync(removeFiles())
        .pipeAsync($do(logExceptions("Error while deleting logs: %s")))
        .pipeAsync(countSucessfullyRemoved())
        .pipeAsync(printMessage(`Removed :{count} log files.`))
        .depipe();

export const clearLogsAction = (options: OptionValues) =>
    Experimental.pipe(options)
        .pipe(validate())
        .pipe(parse())
        .pipe(getTime())
        .pipe(clearLogs())
        .depipe();
