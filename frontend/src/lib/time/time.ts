const TIME_FORMAT = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):[0-5][0-9]$/;

/**
 * Time class for basic time manipulation.
 */
export class Time {
    constructor(private hours: number, private mins: number) {
        if (hours > 24 || hours < 0) {
            throw new Error("Invalid hour");
        }
        if (mins > 59 || mins < 0) {
            throw new Error("Invalid minute");
        }
    }
    static fromDate(date: Date) {
        return new Time(date.getHours(), date.getMinutes());
    }
    static fromString(string: string) {
        const matches = string.match(TIME_FORMAT);
        if (!matches) {
            throw new Error();
        }

        return new Time(+matches[1], +matches[2]);
    }
    addMins(mins: number, times = 1) {
        for (let i = 0; i < times; i++) {
            this.add(mins);
        }
    }
    toString(): string {
        return `${this.hours.toString().padStart(2, "0")}:${this.mins
            .toString()
            .padStart(2, "0")}`;
    }
    private add(mins: number) {
        this.mins += mins;
        if (this.mins > 59) {
            this.mins = this.mins % 60;
            this.hours += 1;
        }
        if (this.hours > 23) {
            this.hours = this.hours % 24;
        }
    }
}
