export const stripQuotes = (s: string): string =>
    s.replace(/^\=["']?(.*)["']?$/, "$1");
