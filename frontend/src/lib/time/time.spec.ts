import { Time } from "./time";

describe("Tine", () => {
    it("Errors on invalid hours or mins", () => {
        expect(() => {
            new Time(25, 3);
        }).toThrow();
        expect(() => {
            new Time(-1, 3);
        }).toThrow();
        expect(() => {
            new Time(10, -1);
        }).toThrow();
        expect(() => {
            new Time(10, 60);
        }).toThrow();
    });
    it("creates a new Time", () => {
        const time = new Time(5, 3);

        expect(time.toString()).toBe("05:03");
    });
    it("adds mins", () => {
        const time = new Time(5, 3);

        time.addMins(5);

        expect(time.toString()).toBe("05:08");
    });
    it("adds mins - tick over hour", () => {
        const time = new Time(5, 56);

        time.addMins(5);

        expect(time.toString()).toBe("06:01");
    });
    it("adds mins - tick over day", () => {
        const time = new Time(23, 56);

        time.addMins(5);

        expect(time.toString()).toBe("00:01");
    });
    it("adds mins - multiple times", () => {
        const time = new Time(23, 56);

        time.addMins(5, 15);

        expect(time.toString()).toBe("01:11");
    });
});
