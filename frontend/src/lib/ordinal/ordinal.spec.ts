import { ordinal } from "./ordinal";

describe("ordinal", () => {
    it("st", () => {
        const tests: { [day: number]: string } = {
            1: "st",
            21: "st",
            31: "st",
            10001: "st",
        };

        for (const [day, expected] of Object.entries(tests)) {
            const o = ordinal(+day);

            expect(o).toBe(expected);
        }
    });
    it("nd", () => {
        const tests: { [day: number]: string } = {
            2: "nd",
            22: "nd",
            2102: "nd",
        };

        for (const [day, expected] of Object.entries(tests)) {
            const o = ordinal(+day);

            expect(o).toBe(expected);
        }
    });
    it("rd", () => {
        const tests: { [day: number]: string } = {
            3: "rd",
            23: "rd",
            33: "rd",
            10003: "rd",
        };

        for (const [day, expected] of Object.entries(tests)) {
            const o = ordinal(+day);

            expect(o).toBe(expected);
        }
    });
    it("th", () => {
        const tests: { [day: number]: string } = {
            5: "th",
            6: "th",
            7: "th",
            8: "th",
            9: "th",
            10: "th",
            11: "th",
            20: "th",
            355: "th",
        };

        for (const [day, expected] of Object.entries(tests)) {
            const o = ordinal(+day);

            expect(o).toBe(expected);
        }
    });
});
