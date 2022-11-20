import { Week } from "./week";
import { parse } from "date-fns";

describe("week", () => {
    it("first/last", () => {
        const date = parse("2022-11-20", "yyyy-MM-dd", new Date());

        expect(Week.firstDay(date).getDate()).toBe(14);
        expect(Week.lastDay(date).getDate()).toBe(20);
    });
    it("days", () => {
        const date = parse("2022-11-20", "yyyy-MM-dd", new Date());

        const week = new Week(date);
        const days = week.getDays();

        expect(days[0].toString()).toBe("Monday 14th");
        expect(days[4].toString()).toBe("Friday 18th");
    });
    it("next/prev", () => {
        const date = parse("2022-11-20", "yyyy-MM-dd", new Date());

        const week = new Week(date);
        const days = week.getDays();

        expect(days[0].toString()).toBe("Monday 14th");
        expect(days[4].toString()).toBe("Friday 18th");

        const lastWeek = week.prev();
        const prevDays = lastWeek.getDays();

        expect(prevDays[0].toString()).toBe("Monday 7th");
        expect(prevDays[4].toString()).toBe("Friday 11th");

        const lastWeekOfMonth = week.next().next();
        const nextDays = lastWeekOfMonth.getDays();

        expect(nextDays[0].toString()).toBe("Monday 28th");
        expect(nextDays[4].toString()).toBe("Friday 2nd");
    });
    it("displays year from start of week", () => {
        const date = parse("2022-12-27", "yyyy-MM-dd", new Date());

        const week = new Week(date);

        expect(week.toString()).toBe("December 2022");
    });
});
