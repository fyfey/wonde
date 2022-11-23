import { Employee } from "./Emplouee";
import { Room } from "./Room";
import { Student } from "./Student";

export interface Lesson {
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
