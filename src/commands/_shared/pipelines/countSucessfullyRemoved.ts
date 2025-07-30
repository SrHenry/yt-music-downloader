export const countSucessfullyRemoved =
    () =>
    /**
     * @param {PromiseSettledResult<void>[]} results
     */
    (results) => {
        return {
            count: results.filter((r) => r.status === "fulfilled").length,

            /** @param {TypeOfTag} hint */
            [Symbol.toPrimitive](hint) {
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
