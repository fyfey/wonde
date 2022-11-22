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
        <div className="area-students h-full bg-white rounded-lg flex flex-col shadow-md overflow-hidden">
            <div className="font-bold text-xl p-4 bg-white border-b">
                Students
            </div>
            <div className="w-full h-full overflow-y-scroll">
                <div className="grid grid-cols-2">
                    <>
                        <div className="p-2 px-4 bg-blue-50 shadow-md sticky top-0 border-b font-bold">
                            Forename
                        </div>
                        <div className="p-2 px-4 bg-blue-50 shadow-md sticky top-0 border-b font-bold">
                            Surname
                        </div>
                    </>
                    {lesson.students
                        .sort(studentSort)
                        .map((student: Student) => (
                            <>
                                <div className="p-2 border-b px-4">
                                    {student.forename}
                                </div>
                                <div className="p-2 border-b px-4">
                                    {student.surname}
                                </div>
                            </>
                        ))}
                </div>
            </div>
            <div className="w-full h-8" />
        </div>
    );
};
