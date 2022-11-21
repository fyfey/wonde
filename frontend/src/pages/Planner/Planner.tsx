import { FC, useEffect, useState } from "react";
import {
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { format, isAfter, isBefore, isEqual } from "date-fns";
import { lessons as lessonsApi, periods as periodsApi } from "../../api";

import { Day } from "../../lib/day/day";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Lesson } from "../../models/Lesson";
import { LessonCell } from "./components/LessonCell/LessonCell";
import { LineCell } from "./components/LineCell/LineCell";
import { Loader } from "../../components";
import { PLANNER_CELL_HEADER_HEIGHT_CLASS } from "../../config";
import { TimeCell } from "./components/TimeCell/TimeCell";
import { Week } from "../../lib/week/week";

type LessonsByDay = { [day: number]: Lesson[] };
const isOverlapping = (lessonA: Lesson, lessonB: Lesson): boolean => {
    if (isEqual(lessonA.startAt, lessonB.startAt)) {
        return true;
    }
    if (
        isAfter(lessonA.endAt, lessonB.startAt) &&
        isBefore(lessonA.endAt, lessonB.endAt)
    ) {
        return true;
    }
    if (
        isAfter(lessonA.startAt, lessonB.startAt) &&
        isBefore(lessonA.startAt, lessonB.endAt)
    ) {
        return true;
    }
    return false;
};

interface PlannerProps {}
export const Planner: FC<PlannerProps> = () => {
    const [days, setDays] = useState<any[]>([]);
    const [lessonsByDay, setLessonsByDay] = useState<LessonsByDay>({});
    const [week, setWeek] = useState(new Week());
    const [loading, setLoading] = useState(true);

    const prev = () => {
        setWeek(week.prev());
    };
    const next = () => {
        setWeek(week.next());
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [week]);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        Promise.allSettled([
            periodsApi().then((p) => setDays(p.days)),
            lessonsApi(
                format(Week.firstDay(week.getDate()), "yyyy-MM-dd"),
                format(Week.lastDay(week.getDate()), "yyyy-MM-dd")
            )
                .then((lessons) => {
                    const lessonsByDay: LessonsByDay = {};
                    lessons.forEach((lesson) => {
                        if (!(Day.dayToIdx(lesson.day) in lessonsByDay)) {
                            lessonsByDay[Day.dayToIdx(lesson.day)] = [];
                        }
                        // check for overlapping
                        lessonsByDay[Day.dayToIdx(lesson.day)].forEach(
                            (existing) => {
                                if (isOverlapping(lesson, existing)) {
                                    existing.overlapping.push(lesson);
                                    lesson.overlapping.push(existing);
                                }
                            }
                        );
                        lessonsByDay[Day.dayToIdx(lesson.day)].push(lesson);
                    });
                    setLessonsByDay(lessonsByDay);
                })
                .catch((err) => {
                    console.error(err);
                }),
        ]).then(() => setLoading(false));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center flex-1">
                <Loader />
            </div>
        );
    }

    return (
        <div>
            <div className="header flex flex-col sticky top-0 bg-white/70 z-30 shadow-md">
                <div className="border-b flex justify-evenly w-full h-8 items-center">
                    <div className="flex w-full justify-around text-sm font-bold">
                        <div className="flex">
                            <button
                                onClick={prev}
                                className="px-2 hover:text-blue-500"
                            >
                                <FontAwesomeIcon icon={faArrowLeftLong} />
                            </button>
                            <div>{week.toString()}</div>
                            <button
                                onClick={next}
                                className="px-2 hover:text-blue-500"
                            >
                                <FontAwesomeIcon icon={faArrowRightLong} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-evenly w-full">
                    <div className="w-64" />
                    {days.map((day, idx) => (
                        <div
                            key={idx}
                            className={`${PLANNER_CELL_HEADER_HEIGHT_CLASS} flex items-center justify-center text-xs font-bold border-r w-full`}
                        >
                            {week.getDays()[idx].toString()}
                        </div>
                    ))}
                </div>
            </div>
            <div className="min-h-full w-full flex justify-evenly">
                <div className="flex-0 w-64 bg-gray-100 min-h-full border-r">
                    <div
                        className={`text-center ${PLANNER_CELL_HEADER_HEIGHT_CLASS}`}
                    />
                    <div className="periods">
                        {Array.from({
                            length: days?.[0]?.diff?.blocks || 0,
                        }).map((_, jdx) => (
                            <TimeCell
                                key={jdx}
                                idx={jdx}
                                startTime={days[0].start}
                            />
                        ))}
                    </div>
                </div>
                {days.map((day, idx) => (
                    <div key={idx} className="w-full min-h-full border-r">
                        <div
                            className={`text-center ${PLANNER_CELL_HEADER_HEIGHT_CLASS}`}
                        />
                        <div className="relative w-full min-h-full">
                            {(lessonsByDay?.[idx] ?? []).map((lesson, jdx) => (
                                <LessonCell key={jdx} lesson={lesson} />
                            ))}
                            <div className="periods absolute w-full min-h-full">
                                {Array.from({
                                    length: day.diff.blocks,
                                }).map((period, jdx) => (
                                    <LineCell key={jdx} idx={jdx} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
