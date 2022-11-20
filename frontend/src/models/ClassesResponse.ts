export interface CreatedAt {
    date: string;
    timezone_type: number;
    timezone: string;
}

export interface UpdatedAt {
    date: string;
    timezone_type: number;
    timezone: string;
}

export interface Meta {
    is_main_teacher: boolean;
    is_class_teacher: boolean;
    role: string;
    all_roles: string[];
}

export interface CreatedAt2 {
    date: string;
    timezone_type: number;
    timezone: string;
}

export interface UpdatedAt2 {
    date: string;
    timezone_type: number;
    timezone: string;
}

export interface Student {
    id: string;
    upi: string;
    mis_id: string;
    initials: string;
    surname: string;
    forename: string;
    middle_names: string;
    legal_surname?: any;
    legal_forename?: any;
    gender?: any;
    date_of_birth?: any;
    restored_at?: any;
    created_at: CreatedAt2;
    updated_at: UpdatedAt2;
}

export interface Employee {
    surename: string;
    forename: string;
    roles: string[];
}

export interface Room {
    name: string;
    code: string;
}

export interface CreatedAt3 {
    date: string;
    timezone_type: number;
    timezone: string;
}

export interface UpdatedAt3 {
    date: string;
    timezone_type: number;
    timezone: string;
}

export interface Data {
    id: string;
    mis_id: string;
    start_time: string;
    end_time: string;
    name: string;
    day: string;
    day_number?: any;
    description?: any;
    created_at: CreatedAt3;
    updated_at: UpdatedAt3;
}

export interface Period {
    data: Data;
}

export interface StartAt {
    date: string;
    timezone_type: number;
    timezone: string;
}

export interface EndAt {
    date: string;
    timezone_type: number;
    timezone: string;
}

export interface CreatedAt4 {
    date: string;
    timezone_type: number;
    timezone: string;
}

export interface UpdatedAt4 {
    date: string;
    timezone_type: number;
    timezone: string;
}

export interface Lesson {
    id: string;
    mis_id: string;
    room: Room;
    period: Period;
    period_instance_id: string;
    employee: string;
    alternative?: any;
    start_at: StartAt;
    end_at: EndAt;
    day_number?: any;
    created_at: CreatedAt4;
    updated_at: UpdatedAt4;
}

export interface ClassesResponse {
    id: string;
    mis_id: string;
    name: string;
    code?: any;
    description: string;
    subject: string;
    alternative?: any;
    restored_at?: any;
    created_at: CreatedAt;
    updated_at: UpdatedAt;
    meta: Meta;
    students: Student[];
    employees: Employee[];
    lessons: Lesson[];
}
