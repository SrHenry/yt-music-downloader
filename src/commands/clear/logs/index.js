import { Dirent } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve } from "node:path";

import { Experimental } from "@srhenry/type-utils";

import { __root__ } from "../../../__root__.js";
import { extractFullPath } from "../../../shared/functions/extractFullPath.js";
import { $do } from "../../../shared/pipelines/do.js";
import { listDir } from "../../../shared/pipelines/listDir.js";
import { logExceptions } from "../../../shared/pipelines/logExceptions.js";
import { map } from "../../../shared/pipelines/map.js";
import { printMessage } from "../../../shared/pipelines/printMessage.js";
import { removeFiles } from "../../../shared/pipelines/removeFiles.js";
import { useFilters } from "../../../shared/pipelines/useFilters.js";
import { countSucessfullyRemoved } from "../../_shared/pipelines/countSucessfullyRemoved.js";
import { parse } from "./pipelines/Options/parse.js";
import { validate } from "./pipelines/Options/validate.js";

/** @typedef {import('node:fs').Stats} Stats */

const logsPath = resolve(__root__, "logs");

/** @return {(logs: Dirent[]) => Dirent[]} */
const filterLogsByExtension =
    (extension = ".log") =>
    (logs) =>
        logs.filter((log) => log.isFile() && log.name.endsWith(extension));

/** @type {(files: unknown[]) => files is Dirent[]} */
const isDirentArray = (files) => files[0] instanceof Dirent;

/** @typedef {[file: string, stats: Stats]} FileWithStats */

/**
 * @type {() => (files: string[] | Dirent[]) => Promise<FileWithStats[]>}
 */
const getStats = () => (files) =>
    Promise.all(
        (isDirentArray(files) ? extractFullPath(files) : files).map((file) =>
            Promise.all([file, stat(file)])
        )
    );

/**
 * @param {Date} time
 * @returns {(_: FileWithStats) => boolean}
 */
const isOlderThan =
    (time) =>
    ([, stat]) =>
        stat.mtimeMs < time.getTime();

/**
 * @template T
 * @typedef {((value: T, index: number, array: T[]) => boolean) | (<S extends T> (value: T, index: number, array: T[]) => value is S)} Predicate<T>
 */

/**
 * @param {Predicate<FileWithStats>[]} filters
 * @returns {(files: FileWithStats[]) => FileWithStats[]} */
const filterStatsBy = (filters) => useFilters(filters);

/**
 * @param {Date | number} time
 * @returns {(files: FileWithStats[]) => typeof files}
 */
const filterStatsOlderThan = (time) => {
    if (typeof time === "number") {
        const d = new Date();

        if (time > 0) {
            d.setDate(d.getDate() - time);
            time = d;
        }
    }

    return filterStatsBy([isOlderThan(time)]);
};

/** @returns {import("../../../shared/pipelines/map.js").Mapper<FileWithStats, string>} */
const fileToPath =
    () =>
    ([path]) =>
        path;

const getTime =
    () =>
    /** @param {import("./transformers/OptionsTransformer.js").ParsedOptions} options */
    ({ time }) =>
        time;

const clearLogs =
    () =>
    /** @param {number} time */
    (time) =>
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

/** @param {import('commander').OptionValues} options */
export const clearLogsAction = (options) =>
    Experimental.pipe(options)
        .pipe(validate())
        .pipe(parse())
        .pipe(getTime())
        .pipe(clearLogs())
        .depipe();
