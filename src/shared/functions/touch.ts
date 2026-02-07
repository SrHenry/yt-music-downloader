import type { PathLike } from "node:fs";
import { open, utimes } from "node:fs/promises";

export async function touch(filename: PathLike) {
    const time = new Date();

    try {
        // Tenta atualizar a data do arquivo existente
        await utimes(filename, time, time);
    } catch (err) {
        if (!(err instanceof Error))
            throw new TypeError(
                `Unexpected error type! Expected Error, got ${String(err?.toString?.() ?? err)}`,
                { cause: err },
            );

        if ("code" in err && err.code === "ENOENT") {
            // Se não existir, cria o arquivo
            await open(filename, "a").then((fh) => fh.close());
        } else {
            throw err;
        }
    }
}
