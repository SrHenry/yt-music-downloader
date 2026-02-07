import { BASE_LOG_PATHS } from "@/constants.ts";
import { functions as log, warn } from "@/log/index.ts";

import { createDirIfNotExists } from "@/shared/functions/createDirIfNotExists.ts";
import { touch } from "@/shared/functions/touch.ts";
import { Abortable } from "node:events";
import { Mode, ObjectEncodingOptions, OpenMode } from "node:fs";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Stream } from "node:stream";

export const logProcess =
    (procName: keyof typeof BASE_LOG_PATHS) =>
    async (
        logContent:
            | string
            | NodeJS.ArrayBufferView
            | Iterable<string | NodeJS.ArrayBufferView>
            | AsyncIterable<string | NodeJS.ArrayBufferView>
            | Stream = "",
        options?:
            | (ObjectEncodingOptions & {
                  mode?: Mode | undefined;
                  flag?: OpenMode | undefined;
                  /**
                   * If all data is successfully written to the file, and `flush`
                   * is `true`, `filehandle.sync()` is used to flush the data.
                   * @default false
                   */
                  flush?: boolean | undefined;
              } & Abortable)
            | BufferEncoding,
    ) => {
        try {
            await createDirIfNotExists(BASE_LOG_PATHS[procName]);

            const filename = log.createLogEntry();

            const file = resolve(BASE_LOG_PATHS[procName], filename);

            if (logContent === "") return touch(file);

            return await writeFile(
                resolve(BASE_LOG_PATHS[procName], filename),
                logContent,
                options,
            );
        } catch (error) {
            return void warn("Failed to create log file:", error);
        }
    };
