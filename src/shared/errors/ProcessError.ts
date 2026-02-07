export class ProcessError<
    StdOutErrType extends string | Buffer = string
> extends Error {
    public readonly code: number;
    public readonly stdout: StdOutErrType | null;
    public readonly stderr: StdOutErrType | null;

    constructor(message: string, code: number);
    constructor(message: string, code: number, stdout: StdOutErrType);
    constructor(
        message: string,
        code: number,
        stdout: StdOutErrType,
        stderr: StdOutErrType
    );
    constructor(
        message: string,
        code: number,
        stdout?: StdOutErrType,
        stderr?: StdOutErrType
    ) {
        super(message);

        this.code = code;
        this.stdout = stdout ?? null;
        this.stderr = stderr ?? null;
    }
}
