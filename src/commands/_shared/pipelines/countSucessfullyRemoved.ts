export const countSucessfullyRemoved =
    () => (results: PromiseSettledResult<void>[]) => {
        return {
            count: results.filter((r) => r.status === "fulfilled").length,

            [Symbol.toPrimitive](hint: TypeOfTag) {
                switch (hint) {
                    case "number":
                        return this.count;
                    case "string":
                        return String(this.count);
                    default:
                        return String(this);
                }
            },
            toString() {
                return `count: ${this.count}`;
            },
        };
    };
