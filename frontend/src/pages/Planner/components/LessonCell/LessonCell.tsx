import { FC, useEffect, useState } from "react";
import { faHome, faPerson } from "@fortawesome/free-solid-svg-icons";
import { offset, useFloating } from "@floating-ui/react-dom";

import { FloatingPortal } from "@floating-ui/react-dom-interactions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Lesson } from "../../../../models/Lesson";
import { Loader } from "../../../../components";
import { OverlapWarning } from "../OverlapWarning/OverlapWarning";
import { PLANNER_CELL_HEIGHT } from "../../../../config";

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

    useEffect(() => {
        setDisplayLesson(lesson);
    }, [lesson]);
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
            <div
                ref={reference}
                className={`lesson w-full h-full rounded-md bg-blue-200 hover:bg-blue-300 text-slate-500 hover:text-slate-600 cursor-pointer p-4 ring-4 ring-white ring-inset`}
            >
                <div className="h-full flex flex-col justify-between">
                    <div className="flex justify-between">
                        <div>{displayLesson.name}</div>
                        <div>{displayLesson.externalId}</div>
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faPerson} />
                            <div>{displayLesson.description.length}</div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon size="xs" icon={faHome} />
                            <div>
                                {displayLesson.room.name} (
                                {displayLesson.room.code})
                            </div>
                        </div>
                    </div>
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
                                    onSwitch={setDisplayLesson}
                                    lesson={displayLesson}
                                />
                            )}
                        </div>
                    </FloatingPortal>
                </div>
            </div>
        </div>
    );
};
