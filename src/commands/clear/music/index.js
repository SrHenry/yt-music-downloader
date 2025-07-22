import { Experimental } from "@srhenry/type-utils";

import { __root__ } from "../../../__root__.js";
import { extractFullPath } from "../../../shared/functions/extractFullPath.js";
import { listDir } from "../../../shared/pipelines/listDir.js";
import { removeFiles } from "../../../shared/pipelines/removeFiles.js";
import { split } from "../../../shared/pipelines/split.js";
import { trimList as trim } from "../../../shared/pipelines/trimList.js";
import { useFilters } from "../../../shared/pipelines/useFilters.js";
import { validate } from "./pipelines/Options/validate.js";

/**
 * @template T
 * @typedef {((value: T, index: number, array: T[]) => boolean) | (<S extends T> (value: T, index: number, array: T[]) => value is S)} Predicate<T>
 */

const musicPath = __root__;

/**
 *  @param {string[]} allowedExtensions
 *  @returns {(file: import('node:fs').Dirent) => boolean}
 */
const useAllowedExtensions = (allowedExtensions) => (file) =>
    file.isFile() &&
    new RegExp(`.(${allowedExtensions.join("|")})$`).test(file.name);

const createFilter =
    () =>
    /** @param {string[]} allowedExtensions */
    (allowedExtensions) =>
        useAllowedExtensions(allowedExtensions);

/** @type {() => (music: import('node:fs').Dirent) => string} */
const getPaths = () => (music) => extractFullPath(music);

/** @type {() => (options: import("./schemas/Options.js").OptionsSchema) => string} */
const getAllowedExtensionsList =
    () =>
    ({ allowedExtensions }) =>
        allowedExtensions;

export const clearMusic =
    () =>
    /** @param {Predicate<import('node:fs').Dirent>} filter */
    (filter) =>
        Experimental.pipe(musicPath)
            .pipe(listDir({ recursive: false }))
            .pipeAsync(useFilters([filter]))
            .pipeAsync(getPaths())
            .pipeAsync(removeFiles())
            .depipe();

/** @param {import('commander').OptionValues} options */
export const clearMusicAction = (options) =>
    Experimental.pipe(options)
        .pipe(validate())
        .pipe(getAllowedExtensionsList())
        .pipe(split(","))
        .pipe(trim())
        .pipe(createFilter())
        .pipe(clearMusic())
        .depipe();
