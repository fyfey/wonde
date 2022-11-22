import { Lesson, Student } from "../../../../models/Lesson";

import { FC } from "react";

const studentSort = (a: Student, b: Student) => {
    return (a.surname + a.forename).localeCompare(b.surname + b.forename);
};

interface StudentsProps {
    lesson: Lesson;
}
export const Students: FC<StudentsProps> = ({ lesson }) => {
    return (
        <div className="area-students h-full bg-white rounded-lg flex flex-col overflow-y-scroll">
            <div className="font-bold text-xl p-4 bg-white border-b sticky top-0">
                Students
            </div>
            <div className="grid grid-cols-2">
                <>
                    <div className="p-2 bg-blue-50 shadow-md sticky top-14 border-b font-bold">
                        Forename
                    </div>
                    <div className="p-2 bg-blue-50 shadow-md sticky top-14 border-b font-bold">
                        Surname
                    </div>
                </>
                {lesson.students.sort(studentSort).map((student: Student) => (
                    <>
                        <div className="p-2 border-b">{student.forename}</div>
                        <div className="p-2 border-b">{student.surname}</div>
                    </>
                ))}
            </div>
        </div>
    );
};
