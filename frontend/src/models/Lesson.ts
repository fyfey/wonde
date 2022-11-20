export interface Student {
    externalId: string;
    forename: string;
    surname: string;
}
export interface Employee {
    externalId: string;
    forename: string;
    surname: string;
    role: "Main Class Teacher" | "Class Teacher";
}
export interface Room {
    name: string;
    code: string;
}
export interface Lesson {
    // day number
    day: number;
    name: string;
    description: string;
    startAt: Date;
    endAt: Date;
    room: Room;
    students: Student[];
    employees: Employee[];
}
