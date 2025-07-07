import debug from "debug";

export const log = debug("workflow");

export const info = log.extend("info");

export const warn = log.extend("warn");

export const error = log.extend("error");
