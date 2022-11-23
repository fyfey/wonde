export interface Employee {
    externalId: string;
    forename: string;
    surname: string;
    email?: string;
    role: "Main Class Teacher" | "Class Teacher";
}
