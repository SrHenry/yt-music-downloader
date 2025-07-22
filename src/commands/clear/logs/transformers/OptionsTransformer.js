/**
 * @typedef {{ time: number }} ModifiedOptions
 *
 * @typedef {Prettify<Omit<import('../schemas/Options.js').OptionsSchema, keyof ModifiedOptions> & ModifiedOptions>} ParsedOptions
 */

/**
 * @param {import('../schemas/Options.js').OptionsSchema} from
 *
 * @returns {ParsedOptions}
 */
export const transform = (from) => {
    const time = Number(from.time);

    if (isNaN(time)) throw new Error("time is not a number!");

    return { ...from, time };
};
