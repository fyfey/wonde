import { FC, MouseEvent, useEffect, useState } from "react";
import {
    faClock,
    faHome,
    faPerson,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { offset, useFloating } from "@floating-ui/react-dom";

import { FloatingPortal } from "@floating-ui/react-dom-interactions";
import { IconInfo } from "./components/IconInfo/IconInfo";
import { Lesson } from "../../../../models/Lesson";
import { Loader } from "../../../../components";
import { OverlapWarning } from "../OverlapWarning/OverlapWarning";
import { PLANNER_CELL_HEIGHT } from "../../../../config";
import { Time } from "../../../../lib/time/time";
import { useNavigate } from "react-router-dom";

interface LessonCellProps {
    lesson: Lesson;
}
export const LessonCell: FC<LessonCellProps> = ({ lesson }) => {
    const [displayLesson, setDisplayLesson] = useState<Lesson | null>(null);
    const { floating, reference, x, y, strategy } = useFloating({
        placement: "top-start",
        middleware: [
            offset({ alignmentAxis: -10, crossAxis: 0, mainAxis: 10 }),
        ],
    });
    const navigate = useNavigate();

    useEffect(() => {
        setDisplayLesson(lesson);
    }, [lesson]);

    const switchLesson = (e: MouseEvent, lesson: Lesson) => {
        e.stopPropagation();
        setDisplayLesson(lesson);
    };
    const showDetail = (e: any) => {
        e.stopPropagation();
        navigate(`/lesson/${lesson.externalId}`);
    };

    if (!displayLesson) {
        return <Loader />;
    }
    return (
        <div
            className={`lessons absolute w-full z-20 h-${
                PLANNER_CELL_HEIGHT * displayLesson.length
            }`}
            style={{
                top: `${PLANNER_CELL_HEIGHT * displayLesson.offset * 0.25}rem`,
            }}
        >
            <div className="w-full h-full p-2">
                <div
                    ref={reference}
                    onClick={showDetail}
                    className={`lesson w-full h-full rounded-md bg-blue-200 hover:bg-blue-300 text-slate-500 hover:text-slate-600 cursor-pointer p-4 shadow-md`}
                >
                    <div className="h-full flex relative flex-col">
                        <div className="flex justify-between">
                            <div className="w-full text-center font-bold">
                                {displayLesson.name}
                            </div>
                        </div>
                        <div className="flex-1" />
                        <IconInfo icon={faClock}>
                            {Time.fromDate(displayLesson.startAt).toString()}
                            &mdash;
                            {Time.fromDate(displayLesson.endAt).toString()}
                        </IconInfo>
                        <IconInfo icon={faStar}>
                            {displayLesson.employees.length} teachers
                        </IconInfo>
                        <IconInfo icon={faPerson}>
                            {displayLesson.students.length} students
                        </IconInfo>
                        <IconInfo icon={faHome}>
                            {displayLesson.room.name} ({displayLesson.room.code}
                            )
                        </IconInfo>
                        <FloatingPortal>
                            <div
                                ref={floating}
                                style={{
                                    top: y ?? 0,
                                    left: x ?? 0,
                                    position: strategy,
                                    width: "max-content",
                                }}
                            >
                                {displayLesson.overlapping.length > 0 && (
                                    <OverlapWarning
                                        onSwitch={switchLesson}
                                        lesson={displayLesson}
                                    />
                                )}
                            </div>
                        </FloatingPortal>
                    </div>
                </div>
            </div>
        </div>
    );
};
