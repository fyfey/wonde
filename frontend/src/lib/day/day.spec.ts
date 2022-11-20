import { Day } from "./day";

describe("day", () => {
    it("toString", () => {
        const tests: [day: number, date: number, expected: string][] = [
            [0, 11, "Sunday 11th"],
            [2, 21, "Tuesday 21st"],
            [6, 3, "Saturday 3rd"],
        ];

        for (const [day, date, expected] of tests) {
            const d = new Day(day, date);

            expect(d.toString()).toBe(expected);
        }
    });
    it("dayToIdx", () => {
        const tests: [date: number, idx: number][] = [
            [0, 6],
            [1, 0],
            [2, 1],
            [3, 2],
            [4, 3],
            [5, 4],
            [6, 5],
        ];

        for (const [day, expected] of tests) {
            expect(Day.dayToIdx(day)).toBe(expected);
        }
    });
});
