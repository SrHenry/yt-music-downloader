import { Experimental, type Fn1 } from "@srhenry/type-utils";

const argExp = /:{([a-zA-Z0-9]+)}/g;

function useArgs<
    Formatter extends string,
    Args extends GetTemplateTuple<Formatter>
>(formatter: Formatter, ...args: Args) {
    const matches = [...formatter.matchAll(argExp)];
    const missingCount = matches.length - args.length;

    if (missingCount > 0)
        throw new TypeError(
            `missing ${missingCount} args defined in formatter string`
        );

    const newArgs = matches.reduce(
        (o, [, argName], i) => ({ ...o, [argName]: args[i] }),
        {} as object
    ) as GetTemplateTupleArgs<Formatter, Args>;

    return Experimental.lambda(
        <TCallback extends Fn1<typeof newArgs, any>>(callback: TCallback) =>
            callback(newArgs)
    );
}

export function printMessage<Message extends string>(
    message: Message
): Experimental.types.AsLambda<
    <ArgTypes extends GetTemplateTuple<Message>>(
        args: GetTemplateTupleArgs<Message, ArgTypes>
    ) => void
>;
export function printMessage<
    Message extends string,
    Args extends GetTemplateTuple<Message>
>(message: Message, ...args: Args): void;

export function printMessage<
    Message extends string,
    Args extends GetTemplateTuple<Message>
>(message: Message, ...args: Args) {
    const printf = Experimental.lambda(
        <ArgTypes extends GetTemplateTuple<Message>>(
            args: GetTemplateTupleArgs<Message, ArgTypes>
        ) => {
            if (typeof args !== "object")
                throw new TypeError("The given argument was not an object");

            if (Array.isArray(args)) throw new TypeError("the given arguments");

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
                message as string
            );

            console.log(parsedMessage);
        }
    );

    if (args.length > 0) return void useArgs(message, ...args).invoke(printf);

    return printf;
}

type GetTemplateArgs<Template extends string> =
    Template extends `${string}:{${infer Arg}}${infer Postfix}`
        ? Postfix extends `${string}:{${string}}${string}`
            ? Prettify<Record<Arg, unknown> & GetTemplateArgs<`${Postfix}`>>
            : Prettify<Record<Arg, unknown>>
        : never;

type GetTemplateTuple<Template extends string> =
    Template extends `${string}:{${string}}${infer Postfix}`
        ? Postfix extends `${string}:{${string}}${string}`
            ? [unknown, ...GetTemplateTuple<`${Postfix}`>]
            : [unknown]
        : never;

type GetTemplateTupleArgs<
    Template extends string,
    Tuple extends GetTemplateTuple<Template>
> = [Template, Tuple] extends [
    `${string}:{${infer Arg}}${infer Postfix}`,
    [infer T0, ...infer TupleRest]
]
    ? Postfix extends `${string}:{${string}}${string}`
        ? TupleRest extends GetTemplateTuple<`${Postfix}`>
            ? Prettify<
                  Record<Arg, T0> &
                      GetTemplateTupleArgs<`${Postfix}`, TupleRest>
              >
            : GetTemplateArgs<`${Template}`>
        : Prettify<Record<Arg, T0>>
    : never;
