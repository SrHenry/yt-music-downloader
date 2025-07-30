import { error } from "../../log/index.ts";

export const logExceptions = (formatter) => {
    return (results) =>
        results
            .filter((r) => r.status === "rejected")
            .forEach(({ reason }) => error(formatter, reason));
};
