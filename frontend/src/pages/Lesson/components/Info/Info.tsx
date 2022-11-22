import { Employee, Lesson } from "../../../../models/Lesson";
import {
    faCalendar,
    faClock,
    faHome,
    faStar,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

import { FC } from "react";
import { IconInfo } from "../../../Planner/components/LessonCell/components/IconInfo/IconInfo";
import { Time } from "../../../../lib/time/time";
import { format } from "date-fns";

interface InfoProps {
    lesson: Lesson;
}
export const Info: FC<InfoProps> = ({ lesson }) => {
    return (
        <div className="area-info bg-white rounded-lg p-8 flex flex-col gap-2 text-lg">
            <div className="font-bold text-3xl mb-4">Class {lesson.name}</div>
            <IconInfo icon={faCalendar}>
                {format(lesson.startAt, "EEEE, do LLLL yyyy")}
            </IconInfo>
            <IconInfo icon={faClock}>
                {Time.fromDate(lesson.startAt).toString()}
                &nbsp;&mdash;&nbsp;
                {Time.fromDate(lesson.endAt).toString()}
            </IconInfo>
            <IconInfo icon={faHome}>
                {lesson.room.name} ({lesson.room.code})
            </IconInfo>
            {lesson.employees.map((employee: Employee) => (
                <IconInfo icon={faUser}>
                    {employee.forename} {employee.surname}
                    {employee.email && <span>&lt;{employee.email}&gt;</span>} (
                    {employee.role})
                </IconInfo>
            ))}
        </div>
    );
};
