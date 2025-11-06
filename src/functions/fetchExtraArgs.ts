export function fetchExtraArgs() {
    const index = process.argv.indexOf("--");

    return index === -1 ? [] : process.argv.slice(index + 1);
}
