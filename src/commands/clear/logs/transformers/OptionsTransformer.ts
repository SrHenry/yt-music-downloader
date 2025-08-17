import type { OptionsSchema } from "../schemas/Options.ts";

export type ModifiedOptions = {
    time: number;
};

export type ParsedOptions = Prettify<
    Omit<OptionsSchema, keyof ModifiedOptions> & ModifiedOptions
>;

/**
 * Transform options object and guarantees 'time' to be a number.
 */
export const transform = (from: OptionsSchema): ParsedOptions => {
    const time = Number(from.time);

    if (isNaN(time)) throw new Error("time is not a number!");

    return { ...from, time };
};
