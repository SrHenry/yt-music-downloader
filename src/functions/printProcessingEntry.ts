export async function printProcessingEntry(
    entry: number,
    total: number | null,
    processFn: () => Promise<any>
): Promise<void> {
    console.log();
    console.log(
        "================================================================================"
    );
    console.log(
        `Processing (${entry}/${Number.isNaN(Number(total)) ? "?" : total}):`
    );
    console.log();
    console.log();

    await processFn();

    console.log(
        "================================================================================"
    );
    console.log();
    console.log();
}
