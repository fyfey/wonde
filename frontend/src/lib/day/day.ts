import { dayNames } from "../consts";
import { ordinal } from "../ordinal/ordinal";

export class Day {
    constructor(private day: number, private date: number) {}

    static dayToIdx(day: number): number {
        return day === 0 ? 6 : day - 1;
    }

    toString() {
        return `${dayNames[this.day]} ${this.date}${ordinal(this.date)}`;
    }
}
