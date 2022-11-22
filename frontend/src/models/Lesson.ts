export interface Student {
    externalId: string;
    forename: string;
    surname: string;
}
export interface Employee {
    externalId: string;
    forename: string;
    surname: string;
    email?: string;
    role: "Main Class Teacher" | "Class Teacher";
}
export interface Room {
    name: string;
    code: string;
}
export interface Lesson {
    // day number
    externalId: string;
    day: number;
    name: string;
    description: string;
    startAt: Date;
    endAt: Date;
    room: Room;
    students: Student[];
    employees: Employee[];
    offset: number;
    length: number;
    overlapping: Lesson[];
}
