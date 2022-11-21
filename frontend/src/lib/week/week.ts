import {
    addDays,
    isMonday,
    isSunday,
    nextSunday,
    nextWednesday,
    previousMonday,
    previousWednesday,
} from "date-fns";

import { Day } from "../day/day";
import { monthNames } from "../consts";

export class Week {
    private days: Day[] = [];
    private month = "";
    constructor(private date = new Date(), private workingDays = 5) {
        this.init();
    }
    private init() {
        let d = Week.firstDay(this.date);
        this.month = monthNames[d.getMonth()];
        this.days = [];
        for (let i = 0; i < this.workingDays; i++) {
            this.days.push(new Day(d.getDay(), d.getDate()));
            d = addDays(d, 1);
        }
    }
    getDate(): Date {
        return this.date;
    }
    getDays(): Day[] {
        return this.days;
    }
    getMonth(): string {
        return this.month;
    }
    prev(): Week {
        return new Week(previousWednesday(Week.firstDay(this.date)));
    }
    next(): Week {
        return new Week(nextWednesday(Week.lastDay(this.date)));
    }
    toString(): string {
        return `${this.month} ${this.date.getFullYear()}`;
    }
    static firstDay(d = new Date()): Date {
        d.setHours(12);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return isMonday(d) ? d : previousMonday(d);
    }
    static lastDay(d = new Date()): Date {
        return isSunday(d) ? d : nextSunday(d);
    }
}
