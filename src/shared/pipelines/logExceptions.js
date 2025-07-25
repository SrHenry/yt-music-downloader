import { error } from "../../log/index.js";

export const logExceptions = (formatter) => {
    return (results) =>
        results
            .filter((r) => r.status === "rejected")
            .forEach(({ reason }) => error(formatter, reason));
};
