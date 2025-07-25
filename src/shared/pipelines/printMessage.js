import { Experimental } from "@srhenry/type-utils";

/**
 * @param {string} message
 */
export function printMessage(message) {
    const argExp = /:{([a-zA-Z0-9]+)}/g;

    return Experimental.lambda((args) => {
        if (typeof args !== "object") console.log(message, args);

        if (Array.isArray(args)) console.log(message, ...args);

        const matches = [...message.matchAll(argExp)];
        const missing = matches.filter(([, argName]) => !(argName in args));

        if (missing.length > 0)
            throw new TypeError(
                [
                    "Invalid arguments.",
                    `The arguments object is missing the following properties: ${missing
                        .map(([, argName]) => `'${argName}'`)
                        .join(", ")}.`,
                ].join("\n")
            );

        const parsedMessage = matches.reduce(
            (str, [, argName]) =>
                str.replaceAll(`:{${argName}}`, String(args[argName])),
            message
        );

        console.log(parsedMessage);
    });
}
