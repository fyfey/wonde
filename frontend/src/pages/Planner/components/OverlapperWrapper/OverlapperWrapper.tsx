import { FC } from "react";
import { Lesson } from "../../../../models/Lesson";
import { LessonCell } from "../LessonCell/LessonCell";
import { PLANNER_CELL_HEIGHT } from "../../../../config";

interface OverlapperWrapperProps {
    lessons: Lesson[];
}
export const OverlapperWrapper: FC<OverlapperWrapperProps> = ({ lessons }) => {
    const sortedLessons = lessons.sort((a, b) => a.offset - b.offset);
    const maxLength = lessons.reduce(
        (acc, l) => (l.length + l.offset > acc ? l.length + l.offset : acc),
        0
    );
    return (
        <div
            className={`lessons absolute w-full z-20 h-${
                PLANNER_CELL_HEIGHT * (maxLength - lessons[0].offset)
            }`}
            style={{
                top: `${
                    PLANNER_CELL_HEIGHT * sortedLessons[0].offset * 0.25
                }rem`,
            }}
        >
            {lessons.map((lesson) => (
                <LessonCell lesson={lesson} />
            ))}
        </div>
    );
};
