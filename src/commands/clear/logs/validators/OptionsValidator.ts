import { Experimental } from "@srhenry/type-utils";

import { Options } from "../schemas/Options.ts";

/**
 * @param {unknown} value
 * @returns {import("../schemas/Options").OptionsSchema}
 */
export const validate = (value) =>
    Experimental.validate(value, Options(), true);
