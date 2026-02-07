export const createLogEntry = () =>
    new Date()
        .toISOString()
        .replace("T", "_")
        .replace(/:/g, "-")
        .concat(".log");
